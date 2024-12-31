export function LoadingState() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg border p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-48 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
                <div className="h-3 w-24 rounded bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-8 w-24 rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}