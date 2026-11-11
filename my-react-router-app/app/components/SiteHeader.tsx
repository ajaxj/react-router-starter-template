import { useState } from "react";
import { Link, NavLink } from "react-router";
import { topNavItems } from "./navData";
import { ChevronDown, MoonIcon, SunIcon } from "./icons";
import { useTheme } from "./useTheme";

export default function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-[#0f9d58]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-lg font-bold text-white">
              捷
            </div>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-base font-bold text-white">捷报比分</span>
              <span className="text-[10px] text-[#e8f5e9]">NOWSCORE</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex">
            {topNavItems.map((item) =>
              item.to ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative px-3.5 py-[18px] text-[15px] transition-colors ${
                      isActive ? "bg-[#2ecc71] font-bold text-white" : "text-[#e8f5e9] hover:bg-[#0a7d47]"
                    }`
                  }
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -right-0.5 top-1 rounded bg-green-600 px-1 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-3.5 py-[18px] text-[15px] text-[#e8f5e9] transition-colors hover:bg-[#0a7d47]"
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -right-0.5 top-1 rounded bg-green-600 px-1 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </a>
              )
            )}
            <a href="#" className="px-3.5 py-[18px] text-[15px] text-[#e8f5e9] transition-colors hover:bg-[#0a7d47]">
              更多 <ChevronDown />
            </a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label="切换日夜模式"
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#e8f5e9] transition-colors hover:bg-[#0a7d47]"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#" className="hidden text-sm text-[#e8f5e9] hover:text-white sm:block">
              登录/注册
            </a>
            <a href="#" className="hidden items-center gap-1 text-sm text-[#e8f5e9] hover:text-white md:flex">
              APP下载
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#e8f5e9] hover:bg-[#0a7d47] lg:hidden"
              aria-label="菜单"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#0a7d47] bg-[#0f9d58] lg:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-px px-3 py-2">
            {topNavItems.map((item) => (
              <a
                key={item.label}
                href={item.to ?? item.href}
                className="rounded px-2 py-2 text-center text-sm text-[#e8f5e9] hover:bg-[#0a7d47]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}