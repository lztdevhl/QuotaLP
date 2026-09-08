// Matches the actual app's .quota-logo-mark: 30px, 4px border, -30deg rotation.
export function QuotaMark({ className = "" }: { className?: string }) {
  return (
    <span className={`quota-brand-mark ${className}`} aria-hidden="true" />
  );
}
export function WindowsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 3.6 8.7 2.5v7H1zm9-1.3L19 1v8.5h-9zM1 10.7h7.7v7L1 16.6zm9 0h9V19l-9-1.3z" />
    </svg>
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}
