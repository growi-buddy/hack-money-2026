import { API_BASE_URL } from '@/config/envs';
import { corsHeaders, handleOptions } from '@/lib/cors';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { dirname } from 'pathe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  const templatePath = path.join(__dirname, 'template.js');
  let script = fs.readFileSync(templatePath, 'utf-8');
  
  const metaData = {
    apiBaseUrl: API_BASE_URL,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };
  
  const metaComment = `// GROWI Tracking Script\n// API Base URL: ${metaData.apiBaseUrl}\n// Generated: ${metaData.timestamp}\n// Version: ${metaData.version}\n\n`;
  
  script = metaComment + script.replace('{{API_BASE_URL}}', API_BASE_URL);
  
  return new NextResponse(script, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...corsHeaders,
    },
  });
}
