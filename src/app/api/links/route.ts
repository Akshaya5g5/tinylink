 
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createLinkSchema = z.object({
  url: z.string().url(),
  customCode: z.string().regex(/[A-Za-z0-9]{6,8}/).optional(),
})

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(links)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, customCode } = createLinkSchema.parse(body)

    // Check if custom code already exists
    if (customCode) {
      const existingLink = await prisma.link.findUnique({
        where: { code: customCode },
      })

      if (existingLink) {
        return NextResponse.json(
          { error: 'Custom code already exists' },
          { status: 409 }
        )
      }
    }

    // Generate a unique code if not provided
    const code = customCode || nanoid(6);

    // Create the link
    const link = await prisma.link.create({
      data: {
        code,
        originalUrl: url,
      },
    })

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create link' },
      { status: 500 }
    )
  }
}