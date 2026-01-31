/**
 * Check if an email is in the admin allowlist (NEXT_PUBLIC_ADMIN_EMAILS).
 * Only these users are considered "admins" and can stay signed in.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '';
  const admins = list.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  return admins.includes(email.toLowerCase());
}
