interface StatCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export function StatCard({ label, value, highlight }: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-7 transition-colors ${
      highlight
        ? "border-accent/30 bg-accent/8"
        : "border-card-border bg-card"
    }`}>
      <p className="text-sm text-muted font-medium mb-4">{label}</p>
      <p className="text-4xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
