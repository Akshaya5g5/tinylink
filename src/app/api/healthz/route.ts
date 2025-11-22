// app/api/healthz/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      ok: true,
      version: '1.0',
      uptime: process.uptime(),
    }, { status: 200 })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Database connection failed' },
      { status: 500 }
    )
  }
}