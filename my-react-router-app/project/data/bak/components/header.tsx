import { useState } from "react";
import { navItems } from "~/lib/nav-items";
import ThemeToggle from "./theme-toggle";

type HeaderProps = {
  dark: boolean;
  onToggle: () => void;
  activeItem?: string;
};

export default function Header({ dark, onToggle, activeItem }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = activeItem
    ? navItems.map((item) => ({ ...item, active: item.name === activeItem }))
    : navItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_0.0625rem_0.25rem_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:shadow-[0_0.0625rem_0.25rem_rgba(0,0,0,0.4)]">
      <div className="container mx-auto flex h-[50px] items-center justify-between px-3 sm:px-4">
        <a href="#" className="flex h-full items-center">
          <span className="text-lg font-bold text-[#ef4444] dark:text-red-400 sm:text-xl">美剧天堂</span>
        </a>

        <div className="relative hidden w-[240px] md:block">
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="text"
              placeholder="输入影片片名或演员名称"
              className="block h-[30px] w-full rounded-full border-0 bg-transparent px-[40px] py-1.5 text-xs text-gray-500 outline-none ring-1 ring-gray-200 focus:ring-[#ef4444] dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:placeholder:text-gray-400 dark:focus:ring-red-400"
            />
            <button type="submit" className="absolute right-0 top-0 flex h-[30px] w-10 items-center justify-center text-gray-400 hover:text-[#ef4444] dark:text-gray-500 dark:hover:text-red-400" aria-label="搜索">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center">
            {items.map((item) => (
              <li key={item.name} className="mx-2.5">
                <a
                  href={item.href}
                  className={`text-base leading-[50px] transition-colors ${
                    item.active
                      ? "text-[#ef4444] dark:text-red-400"
                      : "text-gray-800 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button
            className="flex h-8 w-8 items-center justify-center text-gray-600 dark:text-gray-300"
            aria-label="搜索"
            onClick={() => document.getElementById("mobile-search-input")?.focus()}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center text-gray-700 dark:text-gray-200" aria-label="菜单" onClick={() => setMobileMenuOpen((v) => !v)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden lg:block">
          <ThemeToggle dark={dark} onToggle={onToggle} />
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800 md:hidden">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <input
            id="mobile-search-input"
            type="text"
            placeholder="输入影片片名或演员名称"
            className="block h-[36px] w-full rounded-full border-0 bg-gray-100 px-4 pr-10 text-sm text-gray-700 outline-none focus:bg-white focus:ring-1 focus:ring-[#ef4444] dark:bg-gray-700 dark:text-gray-200 dark:focus:bg-gray-700 dark:focus:ring-red-400"
          />
          <button type="submit" className="absolute right-0 top-0 flex h-[36px] w-10 items-center justify-center text-[#ef4444] dark:text-red-400" aria-label="搜索">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.name} className="border-b border-gray-50 last:border-b-0 dark:border-gray-700">
                <a
                  href={item.href}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    item.active
                      ? "bg-[#fdf2f2] text-[#ef4444] dark:bg-red-900/40 dark:text-red-400"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#ef4444] dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-red-400"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}