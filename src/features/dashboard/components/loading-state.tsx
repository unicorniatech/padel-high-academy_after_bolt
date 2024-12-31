export function LoadingState() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-1/3 rounded-lg bg-muted" />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-muted" />
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-[300px] rounded-lg bg-muted" />
        <div className="h-[300px] rounded-lg bg-muted" />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-[400px] rounded-lg bg-muted" />
        </div>
        <div className="h-[400px] rounded-lg bg-muted" />
      </div>
    </div>
  );
}