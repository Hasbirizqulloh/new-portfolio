import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // Untuk tahap awal, kita gunakan variabel lingkungan (ENV)
          // Anda bisa mengganti ini dengan pengecekan database nanti
          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (email === adminEmail && password === adminPassword) {
            return {
              id: "1",
              name: "Admin",
              email: adminEmail,
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
      const isAdminPage = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin/login";

      if (isApiAuthRoute) return true;

      if (isAdminPage) {
        if (isLoginPage) {
          if (isLoggedIn) return Response.redirect(new URL("/admin/dashboard", nextUrl));
          return true;
        }
        return isLoggedIn; // Redirect ke login jika tidak logged in
      }
      return true;
    },
  },
});
