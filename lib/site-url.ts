/**
 * Canonical public origin for metadata, OG, and sitemap.
 * Vercel sets VERCEL_URL on each deployment (https://vercel.com/docs/environment-variables/system-environment-variables).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}
