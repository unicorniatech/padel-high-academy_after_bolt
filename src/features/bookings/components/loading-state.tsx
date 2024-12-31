export function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Booking Form Skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-full rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>

        {/* Court Schedule Skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-full rounded bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}