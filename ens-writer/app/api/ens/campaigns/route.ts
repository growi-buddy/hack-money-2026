import { NextRequest, NextResponse } from "next/server";
import { createCampaignOnEns } from "@/lib/ensWriter";

interface CreateCampaignBody {
  code: string;
  termsURI: string;
  termsHash: string;
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
  if (!/^[A-Z0-9]+$/.test(code)) {
    return { field: "code", message: "Code must be uppercase alphanumeric" };
  }
  return null;
}

/**
 * Valida el termsURI
 */
function validateTermsURI(termsURI: unknown): ValidationError | null {
  if (typeof termsURI !== "string") {
    return { field: "termsURI", message: "termsURI must be a string" };
  }
  if (termsURI.trim().length === 0) {
    return { field: "termsURI", message: "termsURI cannot be empty" };
  }
  return null;
}

/**
 * Valida el termsHash (0x + 64 caracteres hex = 66 total)
 */
function validateTermsHash(termsHash: unknown): ValidationError | null {
  if (typeof termsHash !== "string") {
    return { field: "termsHash", message: "termsHash must be a string" };
  }
  if (!termsHash.startsWith("0x")) {
    return { field: "termsHash", message: "termsHash must start with 0x" };
  }
  if (termsHash.length !== 66) {
    return { field: "termsHash", message: "termsHash must be 66 characters (0x + 64 hex)" };
  }
  if (!/^0x[0-9a-fA-F]{64}$/.test(termsHash)) {
    return { field: "termsHash", message: "termsHash must be valid hex" };
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
    
    const termsURIError = validateTermsURI(body.termsURI);
    if (termsURIError) errors.push(termsURIError);
    
    const termsHashError = validateTermsHash(body.termsHash);
    if (termsHashError) errors.push(termsHashError);
    
    const yellowChannelIdError = validateYellowChannelId(body.yellowChannelId);
    if (yellowChannelIdError) errors.push(yellowChannelIdError);

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: errors },
        { status: 400 }
      );
    }

    // Crear campaña en ENS
    const result = await createCampaignOnEns({
      code: body.code,
      termsURI: body.termsURI,
      termsHash: body.termsHash,
      yellowChannelId: body.yellowChannelId,
    });

    return NextResponse.json(
      {
        ok: true,
        code: body.code,
        fqdn: result.fqdn,
        node: result.node,
        txHashes: result.txHashes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
