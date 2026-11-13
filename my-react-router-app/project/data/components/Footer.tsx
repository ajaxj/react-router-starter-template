import { Link } from "react-router";
import { useTheme } from "./ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t ${isDark ? "border-[#262630] bg-[#0a0a0d]" : "border-gray-200 bg-white"} mt-8 transition-colors duration-300`}>
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>关于</h4>
            <ul className={`space-y-2 text-xs ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-800"}`}>
              <li><Link to="#" className="transition-colors">关于我们</Link></li>
              <li><Link to="#" className="transition-colors">联系方式</Link></li>
              <li><Link to="#" className="transition-colors">帮助中心</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>社区</h4>
            <ul className={`space-y-2 text-xs ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-800"}`}>
              <li><Link to="#" className="transition-colors">上传视频</Link></li>
              <li><Link to="#" className="transition-colors">创作者中心</Link></li>
              <li><Link to="#" className="transition-colors">论坛</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>法律</h4>
            <ul className={`space-y-2 text-xs ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-800"}`}>
              <li><Link to="#" className="transition-colors">服务条款</Link></li>
              <li><Link to="#" className="transition-colors">隐私政策</Link></li>
              <li><Link to="#" className="transition-colors">DMCA</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>关注我们</h4>
            <div className="flex gap-2">
              <div className={`h-7 w-7 rounded-md ${isDark ? "bg-[#1a1a22]" : "bg-gray-200"}`}></div>
              <div className={`h-7 w-7 rounded-md ${isDark ? "bg-[#1a1a22]" : "bg-gray-200"}`}></div>
              <div className={`h-7 w-7 rounded-md ${isDark ? "bg-[#1a1a22]" : "bg-gray-200"}`}></div>
            </div>
          </div>
        </div>
        <div className={`mt-6 pt-6 border-t ${isDark ? "border-[#1e1e28] text-gray-600" : "border-gray-100 text-gray-500"} text-center text-xs`}>
          © 2026 VideoHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}