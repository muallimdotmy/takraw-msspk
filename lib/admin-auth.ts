/**
 * Kata laluan admin.
 * Set ADMIN_PASSWORD dalam .env.local / Vercel env.
 * Default untuk local dev sahaja.
 */
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "msspk2026";
}

export function checkAdminPassword(password: string | null | undefined) {
  if (!password) return false;
  return password === getAdminPassword();
}
