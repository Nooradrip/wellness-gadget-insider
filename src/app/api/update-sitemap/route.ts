// app/api/update-sitemap/route.ts
import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    const output = execSync('npm run update-sitemap').toString();
    return NextResponse.json({ 
      success: true,
      output: output.split('\n') 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}