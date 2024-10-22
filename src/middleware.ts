import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/form/(.*)/edit',
    '/form/responses',
])

export default clerkMiddleware((auth, request) => {
    if (isProtectedRoute(request)) {
        auth().protect()
    }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};