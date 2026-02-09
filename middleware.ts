import { routing } from '@/shared/configs/i18n/lib';
import createMiddleware from 'next-intl/middleware';

import { NextResponse, type NextRequest } from 'next/server';

const initMiddleware = createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

export default function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const session = cookies.get('session')?.value;

  if (url.includes('/auth') && session) {
    return NextResponse.redirect(new URL(`/dashboard`, url));
  }

  if (url.includes('/dashboard') && !session) {
    return NextResponse.redirect(new URL(`/auth/sign-in`, url));
  }

  return initMiddleware(request);
}
