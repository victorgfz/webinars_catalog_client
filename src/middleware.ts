import { NextResponse, NextRequest } from 'next/server'


const publicRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }, { path: "/add-webinar" }]


export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === pathname)
    const authToken = request.cookies.get("token")

    if (!authToken && publicRoute) return NextResponse.next()
    if (!authToken && !publicRoute) return NextResponse.redirect(new URL('/auth/login', request.url))
    if (authToken && publicRoute) return NextResponse.redirect(new URL('/dashboard', request.url))

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],

}