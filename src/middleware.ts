import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    const validUser = process.env.ADMIN_USER || 'admin'
    const validPass = process.env.ADMIN_PASS || 'forexhub2026'

    if (user === validUser && pwd === validPass) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Akses Disekat: Sila masukkan nama pengguna dan kata laluan.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
    },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
