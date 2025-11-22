import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> } // 1. Update type to Promise
) {
  // 2. AWAIT the params promise before accessing its properties
  const { code } = await params;

  try {
    console.log(`Redirect request for code: ${code}`);

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      console.log(`Link not found for code: ${code}`);
      return NextResponse.redirect(new URL('/404', request.url), 302);
    }

    console.log('Link found:', link);

    const updatedLink = await prisma.link.update({
      where: { id: link.id },
      data: {
        clicks: link.clicks + 1,
        lastClicked: new Date(),
      },
    });

    console.log('Link updated:', updatedLink);

    return NextResponse.redirect(link.originalUrl, 302);
  } catch (error) {
    console.error('Failed to redirect:', error);
    return NextResponse.json(
      { error: 'Failed to redirect' },
      { status: 500 }
    );
  }
}