export function QueenIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 34L7 16l7 6 4-10 6 9 6-9 4 10 7-6-3 18H10Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="9" y="35" width="30" height="5" rx="1.5" fill="currentColor" />
      <circle cx="9" cy="14" r="2.6" fill="currentColor" />
      <circle cx="24" cy="9" r="2.6" fill="currentColor" />
      <circle cx="39" cy="14" r="2.6" fill="currentColor" />
    </svg>
  );
}
