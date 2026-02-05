// app/api/script/route.ts
import { ApiErrorResponse } from '@/types';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { dirname } from 'pathe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.local.growi.app';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) {
    const response: ApiErrorResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Site ID is required' },
    };
    return NextResponse.json(response, { status: 400 });
  }
  
  const templatePath = path.join(__dirname, 'template.js');
  let script = fs.readFileSync(templatePath, 'utf-8');
  
  const metaData = {
    siteId: id,
    apiBaseUrl: API_BASE_URL,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };
  
  const metaComment = `// Site ID: ${metaData.siteId}\n// API Base URL: ${metaData.apiBaseUrl}\n// Timestamp: ${metaData.timestamp}\n// Version: ${metaData.version}\n\n`;
  
  script = metaComment + script
    .replace('{{SITE_ID}}', id)
    .replace('{{API_BASE_URL}}', API_BASE_URL);
  
  return new NextResponse(script, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
