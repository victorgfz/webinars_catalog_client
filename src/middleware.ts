import { NextResponse, NextRequest } from 'next/server'

const publicRoutes = ["/auth/login", "/auth/register", "/add-webinar"]

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(pathname)

    const authToken = request.cookies.get("authToken")?.value


    if (!authToken && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


    if (authToken && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}