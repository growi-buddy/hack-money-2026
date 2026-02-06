import { NextRequest, NextResponse } from "next/server";
import { createCampaignOnEns } from "@/lib/ensWriter";
import { generateTermsWithHash, type CampaignMetadata } from "@/lib/terms/canonical";
import { uploadTermsJson } from "@/lib/pinata/upload";
import { upsertCampaign } from "@/app/lib/repo";
import { ENS_ROOT_NAME } from "@/lib/chain/config";
import { normalize } from "viem/ens";

interface CreateCampaignBody {
  code: string;
  campaignId: string;
  campaignName: string;
  description: string;
  startDate: number;
  endDate: number;
  campaignManager: string;
  yellowChannelId?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Valida el formato del código de campaña
 */
function validateCode(code: unknown): ValidationError | null {
  if (typeof code !== "string") {
    return { field: "code", message: "Code must be a string" };
  }
  if (code.length < 3 || code.length > 10) {
    return { field: "code", message: "Code must be between 3 and 10 characters" };
  }
  return null;
}

/**
 * Valida campaignId
 */
function validateCampaignId(campaignId: unknown): ValidationError | null {
  if (typeof campaignId !== "string") {
    return { field: "campaignId", message: "campaignId must be a string" };
  }
  if (campaignId.trim().length === 0) {
    return { field: "campaignId", message: "campaignId cannot be empty" };
  }
  return null;
}

/**
 * Valida campaignName
 */
function validateCampaignName(campaignName: unknown): ValidationError | null {
  if (typeof campaignName !== "string") {
    return { field: "campaignName", message: "campaignName must be a string" };
  }
  if (campaignName.trim().length === 0) {
    return { field: "campaignName", message: "campaignName cannot be empty" };
  }
  return null;
}

/**
 * Valida description
 */
function validateDescription(description: unknown): ValidationError | null {
  if (typeof description !== "string") {
    return { field: "description", message: "description must be a string" };
  }
  if (description.trim().length === 0) {
    return { field: "description", message: "description cannot be empty" };
  }
  return null;
}

/**
 * Valida timestamps (startDate, endDate)
 */
function validateTimestamp(value: unknown, field: string): ValidationError | null {
  if (typeof value !== "number") {
    return { field, message: `${field} must be a number (Unix timestamp)` };
  }
  if (value <= 0) {
    return { field, message: `${field} must be a positive timestamp` };
  }
  return null;
}

/**
 * Valida campaignManager (wallet address)
 */
function validateCampaignManager(campaignManager: unknown): ValidationError | null {
  if (typeof campaignManager !== "string") {
    return { field: "campaignManager", message: "campaignManager must be a string" };
  }
  if (campaignManager.length > 42) {
    return { field: "campaignManager", message: "campaignManager must be less than 42 characters (name)" };
  }
  return null;
}

/**
 * Valida el yellowChannelId opcional
 */
function validateYellowChannelId(yellowChannelId: unknown): ValidationError | null {
  if (yellowChannelId === undefined || yellowChannelId === null) {
    return null;
  }
  if (typeof yellowChannelId !== "string") {
    return { field: "yellowChannelId", message: "yellowChannelId must be a string" };
  }
  if (yellowChannelId.trim().length === 0) {
    return { field: "yellowChannelId", message: "yellowChannelId cannot be empty" };
  }
  return null;
}

/**
 * Verifica la autenticación mediante x-api-key
 */
function checkAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ENS_WRITER_API_KEY;
  
  if (!expectedKey) {
    console.error("ENS_WRITER_API_KEY no está configurada");
    return false;
  }
  
  return apiKey === expectedKey;
}

/**
 * POST /api/ens/campaigns
 * Crea una nueva campaña en ENS
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    if (!checkAuth(request)) {
      return NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Parse body
    let body: CreateCampaignBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: [{ field: "body", message: "Invalid JSON" }] },
        { status: 400 }
      );
    }

    // Validar campos
    const errors: ValidationError[] = [];
    
    const codeError = validateCode(body.code);
    if (codeError) errors.push(codeError);
    
    const campaignIdError = validateCampaignId(body.campaignId);
    if (campaignIdError) errors.push(campaignIdError);
    
    const campaignNameError = validateCampaignName(body.campaignName);
    if (campaignNameError) errors.push(campaignNameError);
    
    const descriptionError = validateDescription(body.description);
    if (descriptionError) errors.push(descriptionError);
    
    const startDateError = validateTimestamp(body.startDate, "startDate");
    if (startDateError) errors.push(startDateError);
    
    const endDateError = validateTimestamp(body.endDate, "endDate");
    if (endDateError) errors.push(endDateError);
    
    const campaignManagerError = validateCampaignManager(body.campaignManager);
    if (campaignManagerError) errors.push(campaignManagerError);
    
    const yellowChannelIdError = validateYellowChannelId(body.yellowChannelId);
    if (yellowChannelIdError) errors.push(yellowChannelIdError);

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: errors },
        { status: 400 }
      );
    }

    // Validar que endDate > startDate
    if (body.endDate <= body.startDate) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: [{ field: "endDate", message: "endDate must be after startDate" }],
        },
        { status: 400 }
      );
    }

    console.log("🚀 Creating campaign:", body.code);

    // 1. Generar terms.json canonical + hash
    const metadata: CampaignMetadata = {
      campaignId: body.campaignId,
      campaignName: body.campaignName,
      description: body.description,
      startDate: body.startDate,
      endDate: body.endDate,
      campaignManager: body.campaignManager,
      yellowChannelId: body.yellowChannelId,
    };

    const { terms, hash: termsHash } = generateTermsWithHash(metadata);
    console.log("✅ Terms generated:", { termsHash });

    // 2. Subir terms.json a Pinata
    const { ipfsUri: termsURI, ipfsHash } = await uploadTermsJson(
      terms,
      body.code
    );
    console.log("✅ Terms uploaded to Pinata:", { termsURI, ipfsHash });

    // 3. Crear campaña en ENS (on-chain)
    const ensResult = await createCampaignOnEns({
      code: body.code,
      termsURI,
      termsHash,
      yellowChannelId: body.yellowChannelId,
    });
    console.log("✅ Campaign created on ENS:", {
      fqdn: ensResult.fqdn,
      node: ensResult.node,
      txCount: ensResult.txHashes.length,
    });

    // 4. Guardar en Supabase
    const normalizedCode = body.code.toLowerCase();
    const normalizedFqdn = normalize(ensResult.fqdn);
    
    await upsertCampaign({
      code: normalizedCode,
      ens_root_name: ENS_ROOT_NAME,
      fqdn: normalizedFqdn,
      node: ensResult.node,
      owner_wallet: body.campaignManager,
      yellow_channel_id: body.yellowChannelId,
      terms_uri: termsURI,
      terms_hash: termsHash,
      status: "ACTIVE",
    });
    console.log("✅ Campaign saved to Supabase:", normalizedCode);

    return NextResponse.json(
      {
        ok: true,
        code: normalizedCode,
        fqdn: ensResult.fqdn,
        node: ensResult.node,
        termsURI,
        termsHash,
        txHashes: ensResult.txHashes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error creating campaign:", error);
    
    // Determinar tipo de error para respuesta más específica
    let errorMessage = "INTERNAL_ERROR";
    let errorDetails = "Unknown error occurred";
    
    if (error instanceof Error) {
      errorDetails = error.message;
      
      // Errores específicos
      if (error.message.includes("Pinata")) {
        errorMessage = "PINATA_ERROR";
      } else if (error.message.includes("ENS") || error.message.includes("transaction")) {
        errorMessage = "ENS_ERROR";
      } else if (error.message.includes("Supabase") || error.message.includes("database")) {
        errorMessage = "DATABASE_ERROR";
      }
    }
    
    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
