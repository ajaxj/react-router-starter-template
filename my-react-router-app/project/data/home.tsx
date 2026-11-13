import { env } from "cloudflare:workers";
import { useState } from "react";

import type { Route } from "./+types/home";
import VideoCard, { type VideoCardData } from "../components/VideoCard";
import PageSidebar from "../components/PageSidebar";
import { useTheme } from "../components/ThemeContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "本周最佳 - VideoHub" },
    { name: "description", content: "本周热门视频排行" },
  ];
}

export function loader() {
  return { message: env.VALUE_FROM_CLOUDFLARE };
}

const sidebarCategories = [
  { name: "全部", icon: "🎬", count: "49,832" },
  { name: "热门推荐", icon: "🔥", count: "12,540" },
  { name: "最新上传", icon: "🆕", count: "8,215" },
  { name: "高清 1080p", icon: "HD", count: "5,623" },
  { name: "4K 超清", icon: "4K", count: "2,104" },
  { name: "长视频", icon: "⏱️", count: "3,418" },
  { name: "短视频", icon: "⚡", count: "7,856" },
  { name: "认证创作者", icon: "✓", count: "1,203" },
];

const topCreators = [
  { name: "CoastalVibes", followers: "2.4M", avatar: "from-orange-400 to-red-500" },
  { name: "UrbanExplorer", followers: "1.9M", avatar: "from-indigo-400 to-purple-500" },
  { name: "SkyHighMedia", followers: "1.5M", avatar: "from-sky-400 to-blue-500" },
  { name: "OceanLife", followers: "1.2M", avatar: "from-cyan-400 to-teal-500" },
  { name: "FoodieGlobal", followers: "980K", avatar: "from-amber-400 to-orange-500" },
];

const rankPeriods = [
  { label: "今日", key: "daily" },
  { label: "本周", key: "weekly" },
  { label: "本月", key: "monthly" },
  { label: "全部时间", key: "all" },
];

const sortOptions = [
  { label: "观看量", key: "views" },
  { label: "评分", key: "rating" },
  { label: "最新", key: "newest" },
  { label: "讨论度", key: "discussed" },
];

const videos: VideoCardData[] = [
  { id: 1, rank: 1, title: "Sunset Beach Escape — The Perfect Weekend Getaway", views: "12.4M", duration: "14:32", rating: "98%", likes: "482K", thumb: "from-orange-500 via-rose-500 to-red-600", uploader: "CoastalVibes", time: "3 天前" },
  { id: 2, rank: 2, title: "City Lights Night Drive — 4K Cinematic Tour", views: "9.8M", duration: "22:17", rating: "97%", likes: "398K", thumb: "from-indigo-600 via-purple-600 to-fuchsia-500", uploader: "UrbanExplorer", time: "5 天前" },
  { id: 3, rank: 3, title: "Mountain Peak Sunrise — Aerial Drone Footage", views: "8.2M", duration: "08:45", rating: "96%", likes: "356K", thumb: "from-sky-500 via-blue-600 to-indigo-700", uploader: "SkyHighMedia", time: "2 天前" },
  { id: 4, rank: 4, title: "Deep Ocean Wonders — Documentary Short", views: "7.6M", duration: "18:03", rating: "95%", likes: "312K", thumb: "from-cyan-500 via-teal-600 to-blue-800", uploader: "OceanLife", time: "1 天前" },
  { id: 5, rank: 5, title: "Street Food Around the World — Episode 7", views: "6.9M", duration: "15:21", rating: "94%", likes: "287K", thumb: "from-amber-500 via-orange-600 to-red-700", uploader: "FoodieGlobal", time: "4 天前" },
  { id: 6, rank: 6, title: "Forest Waterfall Relaxation — 3 Hour Loop", views: "6.3M", duration: "180:00", rating: "93%", likes: "265K", thumb: "from-emerald-500 via-teal-600 to-green-800", uploader: "NatureRelax", time: "6 天前" },
  { id: 7, rank: 7, title: "Retro Arcade Tour — 80s Gaming Paradise", views: "5.8M", duration: "12:58", rating: "92%", likes: "234K", thumb: "from-pink-500 via-fuchsia-600 to-purple-700", uploader: "RetroGamer", time: "1 天前" },
  { id: 8, rank: 8, title: "Desert Storm Timelapse — Natural Phenomena", views: "5.2M", duration: "06:44", rating: "91%", likes: "198K", thumb: "from-yellow-500 via-amber-600 to-orange-800", uploader: "WeatherWatch", time: "3 天前" },
  { id: 9, rank: 9, title: "Tokyo Neon Nights — Walking Tour 4K", views: "4.9M", duration: "25:10", rating: "90%", likes: "187K", thumb: "from-rose-500 via-pink-600 to-fuchsia-700", uploader: "TravelPulse", time: "2 天前" },
  { id: 10, rank: 10, title: "Underground Cave Exploration — GoPro", views: "4.5M", duration: "19:22", rating: "89%", likes: "156K", thumb: "from-slate-600 via-gray-700 to-zinc-900", uploader: "AdventureX", time: "5 天前" },
  { id: 11, rank: 11, title: "Northern Lights Chase — Iceland Adventure", views: "4.1M", duration: "11:37", rating: "88%", likes: "142K", thumb: "from-green-400 via-emerald-600 to-teal-800", uploader: "PolarExplorer", time: "4 天前" },
  { id: 12, rank: 12, title: "Classic Car Restoration — Episode 3", views: "3.8M", duration: "28:45", rating: "87%", likes: "128K", thumb: "from-red-500 via-rose-600 to-pink-800", uploader: "GarageHero", time: "6 天前" },
  { id: 13, rank: 13, title: "Volcano Eruption From Space — Satellite Footage", views: "3.5M", duration: "07:22", rating: "96%", likes: "118K", thumb: "from-orange-600 via-red-700 to-rose-900", uploader: "SpaceEye", time: "1 天前" },
  { id: 14, rank: 14, title: "Cooking Ramen From Scratch — Tokyo Style", views: "3.3M", duration: "22:10", rating: "94%", likes: "112K", thumb: "from-amber-500 via-orange-600 to-yellow-700", uploader: "NoodleMaster", time: "2 天前" },
  { id: 15, rank: 15, title: "Skydive Over Swiss Alps — 4K POV", views: "3.1M", duration: "05:58", rating: "95%", likes: "108K", thumb: "from-sky-400 via-cyan-500 to-blue-700", uploader: "FreeFall", time: "3 天前" },
  { id: 16, rank: 16, title: "Abstract Art Tutorial — Acrylic Pouring", views: "2.9M", duration: "16:44", rating: "90%", likes: "96K", thumb: "from-violet-500 via-purple-600 to-fuchsia-700", uploader: "ArtStudio", time: "4 天前" },
  { id: 17, rank: 17, title: "Amazon Rainforest — Wildlife Compilation", views: "2.7M", duration: "32:18", rating: "97%", likes: "89K", thumb: "from-green-500 via-emerald-600 to-teal-800", uploader: "WildEarth", time: "5 天前" },
  { id: 18, rank: 18, title: "Cyberpunk Cityscape — Blade Runner Tribute", views: "2.5M", duration: "14:07", rating: "92%", likes: "82K", thumb: "from-fuchsia-600 via-purple-700 to-indigo-900", uploader: "NeonDreams", time: "1 天前" },
  { id: 19, rank: 19, title: "Perfect Golf Swing — Slow Motion Analysis", views: "2.3M", duration: "10:33", rating: "89%", likes: "74K", thumb: "from-lime-500 via-green-600 to-emerald-800", uploader: "GolfPro", time: "2 天前" },
  { id: 20, rank: 20, title: "Winter Storm Chase — Blizzard Footage", views: "2.1M", duration: "18:50", rating: "91%", likes: "68K", thumb: "from-blue-300 via-sky-500 to-indigo-700", uploader: "StormHunter", time: "6 天前" },
  { id: 21, rank: 21, title: "Indie Music Festival — Live Highlights", views: "1.9M", duration: "48:22", rating: "93%", likes: "62K", thumb: "from-rose-500 via-fuchsia-600 to-purple-800", uploader: "LiveStage", time: "3 天前" },
  { id: 22, rank: 22, title: "Zen Garden Design — Japanese Minimalism", views: "1.7M", duration: "24:15", rating: "95%", likes: "56K", thumb: "from-stone-400 via-gray-500 to-zinc-700", uploader: "ZenGarden", time: "4 天前" },
  { id: 23, rank: 23, title: "Underwater Cave Diving — Cenotes of Mexico", views: "1.5M", duration: "13:44", rating: "94%", likes: "48K", thumb: "from-teal-400 via-cyan-600 to-blue-900", uploader: "DeepBlue", time: "2 天前" },
  { id: 24, rank: 24, title: "Street Dance Battle — Hip Hop Finals", views: "1.3M", duration: "20:05", rating: "90%", likes: "42K", thumb: "from-red-500 via-orange-600 to-yellow-600", uploader: "BeatStreet", time: "1 天前" },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activePeriod, setActivePeriod] = useState("weekly");
  const [activeSort, setActiveSort] = useState("views");

  return (
    <div className="mx-auto max-w-[1400px] flex gap-0 sm:gap-4 px-0 sm:px-4 py-4">
      <PageSidebar categories={sidebarCategories} creators={topCreators} />

      <div className="flex-1 min-w-0">
        {/* Title */}
        <div className="mb-4 px-3 sm:px-0">
          <div className="flex items-center gap-2 mb-1">
            <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>本周最佳</h1>
          </div>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>按观看量排名的本周最热门视频</p>
        </div>

        {/* Period Tabs */}
        <div className={`mb-4 border-b ${isDark ? "border-[#262630]" : "border-gray-200"} px-3 sm:px-0`}>
          <div className="flex gap-1 -mb-px overflow-x-auto scrollbar-none">
            {rankPeriods.map((p) => (
              <button
                key={p.key}
                onClick={() => setActivePeriod(p.key)}
                className={`whitespace-nowrap border-b-2 px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors ${
                  activePeriod === p.key
                    ? "border-orange-500 text-orange-500"
                    : `border-transparent ${isDark ? "text-gray-400 hover:text-orange-400" : "text-gray-600 hover:text-orange-500"}`
                }`}
              >
                {p.label}
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
          <span className={`hidden sm:block text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>共 {videos.length} 个视频</span>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-3 sm:px-0">
          {videos.map((video) => (
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