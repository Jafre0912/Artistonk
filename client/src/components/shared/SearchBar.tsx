import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
}: SearchBarProps) {
  return (
    <div className="relative min-w-[200px] flex-1">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-ink-900/10 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 outline-none transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-brand-300"
      />
    </div>
  )
}