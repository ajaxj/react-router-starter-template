import { useState } from "react";
import type { Route } from "./+types/categories";
import VideoCard, { type VideoCardData } from "../components/VideoCard";
import PageSidebar from "../components/PageSidebar";
import { useTheme } from "../components/ThemeContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "分类 - VideoHub" }];
}

const allCategories = [
  { name: "全部", icon: "🎬", count: "49,832" },
  { name: "热门推荐", icon: "🔥", count: "12,540" },
  { name: "最新上传", icon: "🆕", count: "8,215" },
  { name: "高清 1080p", icon: "HD", count: "5,623" },
  { name: "4K 超清", icon: "4K", count: "2,104" },
  { name: "长视频", icon: "⏱️", count: "3,418" },
  { name: "短视频", icon: "⚡", count: "7,856" },
  { name: "认证创作者", icon: "✓", count: "1,203" },
  { name: "风景", icon: "🏔️", count: "6,412" },
  { name: "美食", icon: "🍜", count: "4,830" },
  { name: "游戏", icon: "🎮", count: "9,120" },
  { name: "音乐", icon: "🎵", count: "3,780" },
  { name: "旅行", icon: "✈️", count: "7,560" },
  { name: "运动", icon: "⚽", count: "5,240" },
];

const topCreators = [
  { name: "CoastalVibes", followers: "2.4M", avatar: "from-orange-400 to-red-500" },
  { name: "UrbanExplorer", followers: "1.9M", avatar: "from-indigo-400 to-purple-500" },
  { name: "SkyHighMedia", followers: "1.5M", avatar: "from-sky-400 to-blue-500" },
  { name: "OceanLife", followers: "1.2M", avatar: "from-cyan-400 to-teal-500" },
  { name: "FoodieGlobal", followers: "980K", avatar: "from-amber-400 to-orange-500" },
];

const sortOptions = [
  { label: "观看量", key: "views" },
  { label: "评分", key: "rating" },
  { label: "最新", key: "newest" },
  { label: "讨论度", key: "discussed" },
];

const sampleVideos: VideoCardData[] = [
  { id: 101, title: "Morning Yoga Flow — 20 Minute Stretch Routine", views: "2.1M", duration: "20:15", rating: "96%", likes: "87K", thumb: "from-emerald-400 via-teal-500 to-cyan-600", uploader: "ZenFlowStudio", time: "2 小时前" },
  { id: 102, title: "Quick Pasta Recipe — Italian Home Cooking", views: "1.5M", duration: "12:40", rating: "94%", likes: "72K", thumb: "from-yellow-400 via-amber-500 to-orange-600", uploader: "ChefMarco", time: "5 小时前" },
  { id: 103, title: "Epic Mountain Biking — Downhill POV 4K", views: "3.2M", duration: "09:22", rating: "98%", likes: "156K", thumb: "from-red-500 via-rose-600 to-pink-700", uploader: "TrailRider", time: "1 天前" },
  { id: 104, title: "Lo-Fi Beats — Study Session 2 Hours", views: "8.7M", duration: "120:00", rating: "95%", likes: "324K", thumb: "from-purple-500 via-indigo-600 to-blue-700", uploader: "ChillVibes", time: "3 天前" },
  { id: 105, title: "Street Photography Tips for Beginners", views: "890K", duration: "15:30", rating: "91%", likes: "42K", thumb: "from-gray-500 via-slate-600 to-zinc-700", uploader: "LensMaster", time: "6 小时前" },
  { id: 106, title: "Tokyo Walking Tour at Night — Shinjuku 4K", views: "4.5M", duration: "45:10", rating: "97%", likes: "198K", thumb: "from-fuchsia-500 via-pink-600 to-rose-700", uploader: "WanderTokyo", time: "4 天前" },
  { id: 107, title: "Building a Gaming PC — Complete Walkthrough", views: "2.8M", duration: "28:55", rating: "93%", likes: "134K", thumb: "from-blue-500 via-indigo-600 to-violet-700", uploader: "TechBuild", time: "1 天前" },
  { id: 108, title: "Ocean Wildlife Documentary — Deep Sea", views: "5.1M", duration: "52:20", rating: "99%", likes: "287K", thumb: "from-cyan-500 via-blue-600 to-indigo-800", uploader: "BluePlanet", time: "1 周前" },
  { id: 109, title: "DIY Home Workout — No Equipment Needed", views: "1.8M", duration: "18:00", rating: "92%", likes: "98K", thumb: "from-lime-500 via-green-600 to-emerald-700", uploader: "FitLife", time: "8 小时前" },
  { id: 110, title: "Hiking Patagonia — Torres del Paine Trek", views: "4.2M", duration: "36:50", rating: "97%", likes: "186K", thumb: "from-cyan-500 via-teal-600 to-green-800", uploader: "TrailBlazer", time: "1 天前" },
  { id: 111, title: "Minimalist Apartment Tour — Small Space Ideas", views: "2.6M", duration: "19:30", rating: "94%", likes: "118K", thumb: "from-stone-300 via-gray-400 to-slate-600", uploader: "HomeDesign", time: "2 天前" },
  { id: 112, title: "Piano Covers — Popular Songs Medley", views: "3.9M", duration: "15:05", rating: "96%", likes: "168K", thumb: "from-slate-500 via-gray-600 to-zinc-800", uploader: "KeysMaster", time: "3 天前" },
  { id: 113, title: "Wildlife Speed Edit — Cheetah Chase 4K", views: "5.4M", duration: "11:20", rating: "98%", likes: "246K", thumb: "from-yellow-500 via-amber-600 to-red-700", uploader: "SafariLens", time: "4 天前" },
  { id: 114, title: "Home Studio Setup — Beginner's Guide", views: "1.2M", duration: "22:15", rating: "89%", likes: "54K", thumb: "from-indigo-500 via-purple-600 to-pink-700", uploader: "SoundLab", time: "6 小时前" },
  { id: 115, title: "French Macarons — Perfect Recipe", views: "2.0M", duration: "17:40", rating: "95%", likes: "92K", thumb: "from-pink-400 via-rose-500 to-red-600", uploader: "SweetStudio", time: "5 小时前" },
  { id: 116, title: "Concert Drone Show — 1000 Drones Sync", views: "6.8M", duration: "09:15", rating: "99%", likes: "312K", thumb: "from-blue-500 via-indigo-600 to-purple-800", uploader: "SkyShow", time: "1 天前" },
  { id: 117, title: "Knife Skills — Professional Cutting Techniques", views: "1.1M", duration: "14:22", rating: "93%", likes: "48K", thumb: "from-zinc-400 via-slate-500 to-gray-700", uploader: "ChefKnife", time: "2 天前" },
  { id: 118, title: "Watercolor Landscapes — Step by Step", views: "980K", duration: "26:05", rating: "91%", likes: "38K", thumb: "from-sky-400 via-blue-500 to-indigo-700", uploader: "BrushWorks", time: "3 天前" },
];

export default function Categories() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeSort, setActiveSort] = useState("views");
  const [activeCategory, setActiveCategory] = useState("全部");

  return (
    <div className="mx-auto max-w-[1400px] flex gap-0 sm:gap-4 px-0 sm:px-4 py-4">
      <PageSidebar categories={allCategories} creators={topCreators} />

      <div className="flex-1 min-w-0">
        {/* Title */}
        <div className="mb-4 px-3 sm:px-0">
          <div className="flex items-center gap-2 mb-1">
            <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>全部分类</h1>
          </div>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>浏览 {allCategories.length} 个精选分类 · 共 {allCategories[0].count} 个视频</p>
        </div>

        {/* Quick Category Grid */}
        <div className="mb-6 px-3 sm:px-0">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
            {allCategories.slice(1).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-1 rounded-lg p-3 text-center transition-colors ${
                  activeCategory === cat.name
                    ? `${isDark ? "bg-orange-600 text-white" : "bg-orange-500 text-white"}`
                    : `${isDark ? "bg-[#15151c] text-gray-400 hover:bg-[#1e1e28] hover:text-gray-200" : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium truncate w-full">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Bar */}
        <div className="mb-4 flex items-center justify-between px-3 sm:px-0">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {sortOptions.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSort(s.key)}
                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs sm:text-sm transition-colors ${
                  activeSort === s.key
                    ? `${isDark ? "bg-[#252530] text-white" : "bg-orange-50 text-gray-900"}`
                    : `${isDark ? "text-gray-500 hover:bg-[#1a1a22]" : "text-gray-500 hover:bg-gray-100"}`
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <span className={`hidden sm:block text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>共 {sampleVideos.length} 个视频</span>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-3 sm:px-0">
          {sampleVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 mb-4 text-center px-3 sm:px-0">
          <button className={`rounded-md border ${isDark ? "border-[#262630] bg-[#15151c] text-gray-400" : "border-gray-200 bg-white text-gray-600"} px-8 py-2.5 text-sm font-medium hover:border-orange-500 hover:text-orange-500 transition-colors`}>
            加载更多
          </button>
        </div>
      </div>
    </div>
  );
}