export default function FilterRow({
  label,
  items,
  activeIndex,
  onSelect,
}: {
  label: string;
  items: string[];
  activeIndex: number;
  onSelect?: (index: number) => void;
}) {
  return (
    <ul className="flex flex-wrap items-center border-b border-gray-100 py-1.5 last:border-b-0 dark:border-gray-700 sm:py-2">
      <li className="mr-2 text-xs text-gray-400 sm:mr-3 sm:text-sm dark:text-gray-500">
        <span>{label}：</span>
      </li>
      {items.map((item, index) => (
        <li key={item} className="mr-3 py-1 sm:mr-5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect?.(index);
            }}
            className={`text-xs transition-colors sm:text-sm ${
              index === activeIndex
                ? "text-[#ef4444] dark:text-red-400"
                : "text-gray-700 hover:text-[#ef4444] dark:text-gray-300 dark:hover:text-red-400"
            }`}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
