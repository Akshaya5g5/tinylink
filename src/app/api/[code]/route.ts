import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> } // 1. Update type to Promise
) {
  // 2. AWAIT the params promise before accessing its properties
  const { code } = await params;

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(link)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch link' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> } // 1. Update type to Promise
) {
  // 2. AWAIT the params promise before accessing its properties
  const { code } = await params;

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      )
    }

    await prisma.link.delete({
      where: { code },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete link' },
      { status: 500 }
    )
  }
}