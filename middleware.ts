import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes you want to protect
const protectedRoute = createRouteMatcher([
  '/',           // Home page
  '/upcoming',   // Upcoming meetings or events
  '/meeting(.*)',// Any sub-route under /meeting, e.g., /meeting/123
  '/previous',   // Previous meetings or events
  '/recordings', // Recordings page
  '/personal-room', // Personal room route
]);

export default clerkMiddleware((auth, req) => {
  // If the route is protected, ensure the user is authenticated
  if (protectedRoute(req)) {
    auth().protect(); // This will redirect the user to the sign-in page if not authenticated
  }
});

// Configuration for matching specific routes
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', // Matches all routes except for static assets and Next.js internals
    '/',                          // Root route
    '/(api|trpc)(.*)',             // Any API or trpc routes
  ],
};
