
import { useMemo, useState } from "react";

import type { Route } from "./+types/home";
import VideoCard, { type VideoCardData } from "../components/VideoCard";
import PageSidebar from "../components/PageSidebar";
import { useTheme } from "../components/ThemeContext";
import {API_ENDPOINTS} from "~/lib/api";
import type {HomePage, TempMovie} from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "本周最佳 - VideoHub" },
    { name: "description", content: "本周热门视频排行" },
  ];
}

// 从 ＣＦ的配置文件中获取环境变量
// import { env } from "cloudflare:workers";
// export function loader() {
//   return { message: env.VALUE_FROM_CLOUDFLARE };
// }

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

const videosByPeriod: Record<string, VideoCardData[]> = {
  daily: [
    { id: 101, rank: 1, title: "Trending Today: Viral Dance Challenge", views: "3.2M", duration: "03:45", rating: "96%", likes: "215K", thumb: "from-pink-500 via-rose-500 to-red-600", uploader: "DanceFever", time: "2 小时前" },
    { id: 102, rank: 2, title: "Breaking: Major Tech Launch Recap", views: "2.8M", duration: "12:10", rating: "94%", likes: "168K", thumb: "from-blue-500 via-indigo-500 to-purple-600", uploader: "TechDaily", time: "5 小时前" },
    { id: 103, rank: 3, title: "Morning Routine That Changed My Life", views: "2.1M", duration: "08:22", rating: "92%", likes: "142K", thumb: "from-amber-400 via-orange-500 to-red-500", uploader: "LifestylePro", time: "7 小时前" },
    { id: 104, rank: 4, title: "Live Concert Highlights — Tonight Only", views: "1.9M", duration: "15:33", rating: "95%", likes: "128K", thumb: "from-fuchsia-500 via-purple-600 to-indigo-700", uploader: "MusicLive", time: "4 小时前" },
    { id: 105, rank: 5, title: "Quick & Easy 5-Minute Breakfast Ideas", views: "1.6M", duration: "06:18", rating: "91%", likes: "98K", thumb: "from-yellow-400 via-amber-500 to-orange-600", uploader: "ChefQuick", time: "9 小时前" },
    { id: 106, rank: 6, title: "Gaming World Record Attempt Live", views: "1.4M", duration: "42:05", rating: "93%", likes: "87K", thumb: "from-green-500 via-emerald-600 to-teal-700", uploader: "ProGamer", time: "3 小时前" },
    { id: 107, rank: 7, title: "Cute Pet Compilation #47", views: "1.2M", duration: "09:47", rating: "97%", likes: "156K", thumb: "from-sky-400 via-cyan-500 to-blue-600", uploader: "PetLovers", time: "6 小时前" },
    { id: 108, rank: 8, title: "News Update: What You Missed Today", views: "980K", duration: "11:20", rating: "89%", likes: "54K", thumb: "from-slate-500 via-gray-600 to-zinc-700", uploader: "NewsNow", time: "1 小时前" },
  ],
  weekly: [
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
  ],
  monthly: [
    { id: 201, rank: 1, title: "Documentary: The Hidden World of Coral Reefs", views: "28.6M", duration: "45:12", rating: "98%", likes: "1.2M", thumb: "from-cyan-500 via-teal-600 to-blue-800", uploader: "OceanLife", time: "3 周前" },
    { id: 202, rank: 2, title: "Ultimate Road Trip Across Europe — Full Series", views: "24.1M", duration: "1:28:30", rating: "97%", likes: "980K", thumb: "from-orange-500 via-red-600 to-pink-700", uploader: "TravelPulse", time: "4 周前" },
    { id: 203, rank: 3, title: "How AI Is Changing Everything — Explained", views: "21.4M", duration: "32:18", rating: "96%", likes: "856K", thumb: "from-violet-500 via-purple-600 to-indigo-700", uploader: "TechInsight", time: "2 周前" },
    { id: 204, rank: 4, title: "Building a Tiny House From Scratch", views: "18.9M", duration: "55:44", rating: "95%", likes: "742K", thumb: "from-amber-500 via-orange-600 to-yellow-700", uploader: "DIYMaster", time: "3 周前" },
    { id: 205, rank: 5, title: "Ancient Civilizations — Lost Cities Rediscovered", views: "16.7M", duration: "38:22", rating: "97%", likes: "689K", thumb: "from-yellow-600 via-amber-700 to-stone-800", uploader: "HistoryBuff", time: "4 周前" },
    { id: 206, rank: 6, title: "The Science of Sleep — Why You're Tired", views: "14.2M", duration: "24:50", rating: "94%", likes: "567K", thumb: "from-indigo-500 via-blue-600 to-cyan-700", uploader: "ScienceHub", time: "1 周前" },
    { id: 207, rank: 7, title: "Street Food Legends: Bangkok to Hanoi", views: "12.8M", duration: "42:15", rating: "96%", likes: "521K", thumb: "from-red-500 via-orange-600 to-amber-700", uploader: "FoodieGlobal", time: "2 周前" },
    { id: 208, rank: 8, title: "Behind the Scenes: Making a AAA Video Game", views: "11.3M", duration: "1:05:30", rating: "93%", likes: "445K", thumb: "from-emerald-500 via-green-600 to-teal-800", uploader: "GameDev", time: "3 周前" },
    { id: 209, rank: 9, title: "Photography Masterclass — Light & Shadow", views: "9.8M", duration: "28:40", rating: "95%", likes: "389K", thumb: "from-slate-500 via-gray-600 to-zinc-800", uploader: "PhotoPro", time: "4 周前" },
    { id: 210, rank: 10, title: "Meditation for Beginners — 30 Day Challenge", views: "8.5M", duration: "22:10", rating: "92%", likes: "312K", thumb: "from-teal-400 via-cyan-500 to-blue-600", uploader: "ZenGarden", time: "2 周前" },
    { id: 211, rank: 11, title: "Extreme Weather: Chasing Tornadoes", views: "7.6M", duration: "19:33", rating: "91%", likes: "278K", thumb: "from-gray-600 via-slate-700 to-zinc-900", uploader: "StormHunter", time: "1 周前" },
    { id: 212, rank: 12, title: "Electric Vehicle Revolution — Documentary", views: "6.9M", duration: "35:20", rating: "94%", likes: "256K", thumb: "from-green-500 via-emerald-600 to-teal-700", uploader: "EcoDrive", time: "3 周前" },
    { id: 213, rank: 13, title: "Cooking Mastery: French Cuisine Basics", views: "5.8M", duration: "48:15", rating: "96%", likes: "234K", thumb: "from-red-600 via-rose-700 to-pink-800", uploader: "ChefPro", time: "4 周前" },
    { id: 214, rank: 14, title: "Urban Sketching — A Day in Paris", views: "4.9M", duration: "16:42", rating: "93%", likes: "198K", thumb: "from-pink-500 via-rose-600 to-purple-700", uploader: "ArtStudio", time: "2 周前" },
    { id: 215, rank: 15, title: "The Future of Space Exploration", views: "4.2M", duration: "30:55", rating: "97%", likes: "187K", thumb: "from-blue-600 via-indigo-700 to-purple-900", uploader: "SpaceEye", time: "1 周前" },
    { id: 216, rank: 16, title: "Surfing the World's Biggest Waves", views: "3.6M", duration: "14:28", rating: "90%", likes: "156K", thumb: "from-cyan-400 via-blue-500 to-indigo-700", uploader: "WaveRider", time: "3 周前" },
  ],
  all: [
    { id: 301, rank: 1, title: "The Universe Explained — Complete Documentary", views: "156M", duration: "1:45:20", rating: "99%", likes: "8.2M", thumb: "from-indigo-700 via-purple-800 to-black", uploader: "CosmosLab", time: "2 年前" },
    { id: 302, rank: 2, title: "Evolution of Music — 100 Years in 10 Minutes", views: "142M", duration: "10:15", rating: "98%", likes: "6.8M", thumb: "from-fuchsia-500 via-purple-600 to-indigo-700", uploader: "MusicHistory", time: "3 年前" },
    { id: 303, rank: 3, title: "Planet Earth: A Visual Journey (4K)", views: "128M", duration: "1:12:40", rating: "99%", likes: "5.4M", thumb: "from-blue-500 via-cyan-600 to-teal-700", uploader: "WildEarth", time: "4 年前" },
    { id: 304, rank: 4, title: "How the Internet Changed Everything", views: "98M", duration: "42:18", rating: "97%", likes: "3.9M", thumb: "from-sky-500 via-blue-600 to-indigo-800", uploader: "TechHistory", time: "2 年前" },
    { id: 305, rank: 5, title: "The Art of Cooking — Michelin Masterclass", views: "87M", duration: "1:05:30", rating: "98%", likes: "3.2M", thumb: "from-orange-500 via-red-600 to-rose-800", uploader: "MasterChef", time: "3 年前" },
    { id: 306, rank: 6, title: "Human Body: The Incredible Machine", views: "76M", duration: "55:22", rating: "97%", likes: "2.8M", thumb: "from-rose-500 via-pink-600 to-purple-700", uploader: "BioScience", time: "5 年前" },
    { id: 307, rank: 7, title: "World's Most Beautiful Places — 8K", views: "69M", duration: "1:20:15", rating: "99%", likes: "4.1M", thumb: "from-emerald-500 via-teal-600 to-cyan-700", uploader: "TravelPulse", time: "2 年前" },
    { id: 308, rank: 8, title: "The History of Video Games", views: "62M", duration: "48:40", rating: "96%", likes: "2.5M", thumb: "from-purple-500 via-fuchsia-600 to-pink-700", uploader: "GamingHistory", time: "3 年前" },
    { id: 309, rank: 9, title: "Mindfulness & Stress Relief — Guided", views: "55M", duration: "35:00", rating: "95%", likes: "1.9M", thumb: "from-teal-400 via-cyan-500 to-blue-600", uploader: "ZenGarden", time: "4 年前" },
    { id: 310, rank: 10, title: "Engineering Marvels: Modern Bridges", views: "48M", duration: "40:22", rating: "94%", likes: "1.5M", thumb: "from-slate-600 via-gray-700 to-zinc-900", uploader: "BuildWorld", time: "2 年前" },
    { id: 311, rank: 11, title: "The Science of Climate Change", views: "42M", duration: "28:15", rating: "96%", likes: "1.3M", thumb: "from-green-500 via-emerald-600 to-teal-800", uploader: "ClimateWatch", time: "1 年前" },
    { id: 312, rank: 12, title: "Greatest Sports Moments of All Time", views: "38M", duration: "52:30", rating: "95%", likes: "1.8M", thumb: "from-amber-500 via-orange-600 to-red-700", uploader: "SportsLegends", time: "3 年前" },
  ],
};

const periodTitleMap: Record<string, { title: string; desc: string }> = {
  daily: { title: "今日最佳", desc: "按观看量排名的今日最热门视频" },
  weekly: { title: "本周最佳", desc: "按观看量排名的本周最热门视频" },
  monthly: { title: "本月最佳", desc: "按观看量排名的本月最热门视频" },
  all: { title: "全时段最佳", desc: "按观看量排名的历史最热门视频" },
};


const EMPTY_HOME_PAGE: HomePage = {
  data: { today_movies: [], weekly_movies: [], month_movies: [] },
};

function formatViewCount(view: number): string {
  if (!Number.isFinite(view) || view <= 0) return "0";
  if (view >= 1_000_000) return `${(view / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (view >= 1_000) return `${(view / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(view);
}

function formatRelativeTime(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "刚刚";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} 分钟前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} 小时前`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} 天前`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} 个月前`;
  return `${Math.floor(month / 12)} 年前`;
}

function movieToVideoCard(movie: TempMovie, index: number): VideoCardData {
  return {
    id: movie.id,
    rank: index + 1,
    title: movie.zh || movie.en || "Untitled",
    views: formatViewCount(movie.view),
    duration: movie.duration || "—",
    rating: "—",
    likes: "—",
    thumb: movie.img || movie.thumb || "",
    uploader: movie.channel || "—",
    time: formatRelativeTime(movie.created),
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const res = await fetch(`${API_ENDPOINTS.HOME_MOVIE_LIST}`);

    if (!res.ok) {
      console.error(`Home page API request failed: ${res.status} ${res.statusText}`);
      return EMPTY_HOME_PAGE;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`Home page API returned non-JSON response: ${text.slice(0, 200)}`);
      return EMPTY_HOME_PAGE;
    }

    const json: HomePage = await res.json();
    console.log(json)
    return json;
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
    return EMPTY_HOME_PAGE;
  }
}





export default function Home({loaderData,}: Route.ComponentProps) {

    const { data } = loaderData;


    const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activePeriod, setActivePeriod] = useState("daily");
  const [activeSort, setActiveSort] = useState("views");

  const videos = useMemo<VideoCardData[]>(() => {
    if (activePeriod === "daily") {
      return (data?.today_movies ?? []).map((movie, index) => movieToVideoCard(movie, index));
    }
    if (activePeriod === "weekly") {
      return (data?.month_movies ?? []).map((movie, index) => movieToVideoCard(movie, index));
    }
    return videosByPeriod[activePeriod] ?? [];
  }, [activePeriod, data]);
  const { title: periodTitle, desc: periodDesc } = periodTitleMap[activePeriod] ?? periodTitleMap.weekly;

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
            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{periodTitle}</h1>
          </div>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>{periodDesc}</p>
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