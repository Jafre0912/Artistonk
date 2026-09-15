interface FilterBarProps {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

export default function FilterBar({ label, value, options, onChange }: FilterBarProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Filter by ${label}`}
      className="rounded-md border border-ink-900/10 bg-white px-3 py-2 text-sm text-ink-700
                 focus:outline-none focus:ring-2 focus:ring-brand-300 transition-shadow cursor-pointer"
    >
      <option value="All">{`All ${label}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}