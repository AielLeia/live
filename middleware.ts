import { config as appConfig } from '@/config';
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: appConfig.PUBLIC_ROUTES,
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
