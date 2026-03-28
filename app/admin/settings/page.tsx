export default function AdminSettingsPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Admin settings</h1>
      <p className="text-sm text-muted-foreground">
        Role gates and service keys will be configured after auth (Phase 2+).
      </p>
    </div>
  );
}
