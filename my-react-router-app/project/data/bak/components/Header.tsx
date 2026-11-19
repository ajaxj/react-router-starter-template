import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "./ThemeContext";

const navItems = [
  { to: "/", label: "首页", end: true },
  { to: "/best", label: "排行榜" },
  { to: "/categories", label: "分类" },
  { to: "/premium", label: "会员" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, parseInt(top.replace("px", ""), 10) * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-50 border-b ${isDark ? "border-[#262630] bg-[#0f0f12]/95" : "border-gray-200 bg-white/95"} backdrop-blur transition-colors duration-300`}>
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-3 sm:px-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-red-600 text-sm font-black text-white">
            X
          </div>
          <span className={`text-lg font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"} hidden sm:block`}>VideoHub</span>
        </Link>

        {/* Search - Mobile */}
        <div className="flex-1 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              className={`w-full rounded-md ${isDark ? "bg-[#1a1a22] text-gray-200 placeholder-gray-500" : "bg-gray-100 text-gray-800 placeholder-gray-400"} px-3 py-1.5 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            <svg className={`absolute left-2.5 top-1.5 h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="搜索视频、创作者、标签..."
              className={`w-full rounded-md ${isDark ? "bg-[#1a1a22] text-gray-200 placeholder-gray-500" : "bg-gray-100 text-gray-800 placeholder-gray-400"} px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            <svg className={`absolute left-3 top-2.5 h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-500"
                    : isDark
                      ? "text-gray-400 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className={`hidden lg:block rounded-md p-1.5 transition-colors ${isDark ? "text-gray-400 hover:bg-[#1a1a22] hover:text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"}`}
            aria-label={isDark ? "切换到日间模式" : "切换到夜间模式"}
            title={isDark ? "切换到日间模式" : "切换到夜间模式"}
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button className="hidden sm:block rounded-md bg-orange-600 px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-orange-500 transition-colors">
            登录
          </button>
          <button className={`hidden md:block rounded-md border ${isDark ? "border-[#3a3a48] text-gray-300 hover:border-gray-500 hover:text-white" : "border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900"} px-3 py-1.5 text-sm font-medium transition-colors`}>
            注册
          </button>

          <button
            ref={buttonRef}
            onClick={() => setMenuOpen((v) => !v)}
            className={`rounded-md p-1.5 lg:hidden transition-colors ${isDark ? "text-gray-400 hover:bg-[#1a1a22] hover:text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"}`}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-x-0 top-14 bottom-0 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={menuRef}
        className={`absolute right-3 top-12 z-50 w-56 origin-top-right overflow-hidden rounded-xl border shadow-xl transition-all duration-200 lg:hidden ${
          menuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        } ${isDark ? "border-[#2a2a35] bg-[#16161d]" : "border-gray-200 bg-white"}`}
        role="dialog"
        aria-label="移动端菜单"
      >
        <nav className="flex flex-col py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? isDark ? "bg-[#1f1f2a] text-orange-400" : "bg-orange-50 text-orange-600"
                    : isDark
                      ? "text-gray-300 hover:bg-[#1f1f2a]"
                      : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <svg className="h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.end ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                ) : item.to === "/best" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                ) : item.to === "/categories" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={`mx-4 border-t ${isDark ? "border-[#2a2a35]" : "border-gray-200"} py-2`}>
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isDark ? "text-gray-300 hover:bg-[#1f1f2a]" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-3">
              {isDark ? (
                <svg className="h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {isDark ? "日间模式" : "夜间模式"}
            </span>
            <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{isDark ? "☀" : "☾"}</span>
          </button>
        </div>

        <div className="flex gap-2 p-3">
          <button className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
            isDark ? "border-[#3a3a48] text-gray-200 hover:border-gray-500 hover:bg-[#1f1f2a]" : "border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-50"
          }`}>
            登录
          </button>
          <button className="flex-1 rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-500 transition-colors">
            注册
          </button>
        </div>
      </div>
    </header>
  );
}