type SectionProps = {
  title: string;
  href?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
};

export default function Section({ title, href, children, extra }: SectionProps) {
  return (
    <div className="mt-3 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:mt-4 sm:p-4">
      <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
        <h2 className="flex items-center text-base font-semibold text-gray-800 dark:text-gray-100 sm:text-lg">
          <span className="mr-2 inline-block h-4 w-1 rounded bg-[#ef4444] dark:bg-red-500" />
          {href ? (
            <a href={href} className="hover:text-[#ef4444] dark:hover:text-red-400">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {extra ??
          (href && (
            <a
              href={href}
              className="text-xs text-gray-400 hover:text-[#ef4444] dark:text-gray-500 dark:hover:text-red-400"
            >
              更多 ›
            </a>
          ))}
      </div>
      {children}
    </div>
  );
}
