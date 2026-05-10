export { auth as proxy } from "@/auth"

export const config = {
  // Melindungi semua rute yang dimulai dengan /admin kecuali /admin/login
  matcher: ["/admin/:path*"],
}
