"use client";

interface StatusToggleProps {
  active: boolean;
  onChange: (active: boolean) => void;
  disabled?: boolean;
}

export function StatusToggle({ active, onChange, disabled = false }: StatusToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      disabled={disabled}
      onClick={() => onChange(!active)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
        ${active ? "bg-emerald-500" : "bg-neutral-300"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200
          ${active ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
