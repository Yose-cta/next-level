import { NextResponse } from 'next/server'

const ACCESS_CODE = process.env.GUIAS_ACCESS_CODE || 'NEXTLEVEL2026'

export async function POST(request: Request) {
  const { code } = await request.json()

  if (code?.toUpperCase() === ACCESS_CODE.toUpperCase()) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set('guias-access', 'granted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ ok: false, error: 'Código incorrecto' }, { status: 401 })
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('guias-access')
  return response
}
