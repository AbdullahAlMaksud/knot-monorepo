export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-text">
        {title}
      </h1>
      {description ? <p className="mt-1 text-sm text-text-muted">{description}</p> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "danger" | "success" | "cyan";
}) {
  const toneClass = {
    neutral: "border-border text-text-muted",
    accent: "border-accent/40 text-accent",
    danger: "border-danger/40 text-danger",
    success: "border-success/40 text-success",
    cyan: "border-cyan/40 text-cyan",
  }[tone];

  return (
    <span className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${toneClass}`}>
      {children}
    </span>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return <div className="py-16 text-center text-sm text-text-muted">{label}</div>;
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-text-muted">
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
      {message}
    </div>
  );
}

export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
      <span>
        Page {page} of {pages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="rounded-md border border-border px-2.5 py-1 transition hover:bg-surface-hover disabled:opacity-40"
        >
          Prev
        </button>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= pages}
          className="rounded-md border border-border px-2.5 py-1 transition hover:bg-surface-hover disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
