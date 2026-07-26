import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  const isProtectedAPI = path.startsWith('/api/admin') || path.startsWith('/api/save-') || path.startsWith('/api/upload-');
  const isAdminPage = path.startsWith('/admin');
  
  if (isAdminPage || isProtectedAPI) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
