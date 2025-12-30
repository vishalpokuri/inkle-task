interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onRefresh?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search all columns...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2 border rounded-lg w-full max-w-lg text-sm font-reg"
      />
    </div>
  );
}
