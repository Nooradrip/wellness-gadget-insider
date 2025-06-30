import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: process.memoryUsage(),
    },
    environment: {
      vercel: process.env.VERCEL ? true : false,
      environment: process.env.NODE_ENV,
      region: process.env.VERCEL_REGION,
    },
    paths: {
      cwd: process.cwd(),
      processExecPath: process.execPath,
    },
    search: {
      apiRoute: '/api/search',
      sampleRequest: `${process.env.NEXT_PUBLIC_SITE_URL}/api/search?q=test`,
    },
  });
}