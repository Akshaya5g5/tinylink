import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// This handles GET /api/links/[code] and DELETE /api/links/[code]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Await the params to get the code from the URL
  const { code } = await params;

  try {
    // Find the link in the database using the code
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      // If no link is found, return a 404 error
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      )
    }

    // Return the link data if found
    return NextResponse.json(link)
  } catch{
    // Handle any server errors
    return NextResponse.json(
      { error: 'Failed to fetch link' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }>}
) {
  // Await the params to get the code from the URL
  const { code } = await params;

  try {
    // Find the link in the database to ensure it exists before deleting
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      // If no link is found, return a 404 error
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      )
    }

    // Delete the link from the database
    await prisma.link.delete({
      where: { code },
    })

    // Return a success response
    return NextResponse.json({ success: true })
  } catch {
    // Handle any server errors
    return NextResponse.json(
      { error: 'Failed to delete link' },
      { status: 500 }
    )
  }
}