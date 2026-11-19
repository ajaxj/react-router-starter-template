import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "../components/ThemeContext";

export interface SidebarCategory {
  name: string;
  icon: string;
  count: string;
}

export interface SidebarCreator {
  name: string;
  followers: string;
  avatar: string;
}

interface PageSidebarProps {
  categories: SidebarCategory[];
  creators?: SidebarCreator[];
}

export default function PageSidebar({ categories, creators = [] }: PageSidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("全部");

  return (
    <aside className="hidden lg:block w-52 xl:w-56 flex-shrink-0 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className={`rounded-lg ${isDark ? "bg-[#15151c]" : "bg-white"} p-3 transition-colors duration-300`}>
        <h3 className={`mb-2 px-2 text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-500"}`}>分类</h3>
        <ul className="space-y-0.5">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                to={`/categories/${encodeURIComponent(cat.name)}`}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                  activeCategory === cat.name
                    ? `${isDark ? "bg-[#252530] text-white" : "bg-orange-50 text-gray-900"}`
                    : `${isDark ? "text-gray-400 hover:bg-[#1e1e28] hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-5 text-center text-xs">{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {creators.length > 0 && (
        <div className={`mt-3 rounded-lg ${isDark ? "bg-[#15151c]" : "bg-white"} p-3 transition-colors duration-300`}>
          <h3 className={`mb-3 px-2 text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-500"}`}>热门创作者</h3>
          <ul className="space-y-2">
            {creators.map((c) => (
              <li key={c.name}>
                <button className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 ${isDark ? "hover:bg-[#1e1e28]" : "hover:bg-gray-100"} transition-colors`}>
                  <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${c.avatar} flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`text-sm truncate ${isDark ? "text-gray-200" : "text-gray-900"}`}>{c.name}</p>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{c.followers} 粉丝</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}