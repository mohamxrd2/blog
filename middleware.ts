import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  LOGIN_REDIRECT,
} from "./routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname.replace(/\/$/, ""); // enlève le slash final

  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);

  console.log("Middleware →", {
    pathname,
    isLoggedIn,
    isPublicRoute,
    isAuthRoute,
    isApiAuthRoute,
  });

  // Ne rien faire pour les routes d'authentification API
  if (isApiAuthRoute) {
    return;
  }

  // Si l'utilisateur est connecté et essaie d'accéder à /login ou /register
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une route privée
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Laisser passer la requête
  return;
});

export const config = {
  matcher: [
    // Ignore fichiers statiques et internes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Toujours matcher les routes API
    '/(api|trpc)(.*)',
  ],
};
