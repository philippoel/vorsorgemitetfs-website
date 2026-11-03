// Bildmarke: drei steigende Balken, der letzte hell (Zulage obendrauf)
export function Bildmarke({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0b6b57" />
      <rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="#fff" />
      <rect x="13.75" y="12" width="4.5" height="13" rx="1.5" fill="#fff" />
      <rect x="20.5" y="7" width="4.5" height="18" rx="1.5" fill="#f2c14e" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Bildmarke />
      <span className="text-lg font-bold tracking-tight text-tinte">
        vorsorge<span className="font-medium text-leise">mit</span>ETFs
      </span>
    </span>
  );
}
