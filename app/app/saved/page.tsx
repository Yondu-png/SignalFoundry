import Link from "next/link";

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-lg space-y-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Saved ideas</h1>
      <p className="text-sm text-muted-foreground">
        Authentication and persistence arrive in Phase 2. For now, bookmark idea
        URLs or use exports from each dossier.
      </p>
      <Link href="/ideas" className="text-sm text-primary underline-offset-4 hover:underline">
        Browse archive
      </Link>
    </div>
  );
}
