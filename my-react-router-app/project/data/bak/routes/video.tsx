import { useState } from "react";
import type { Route } from "./+types/video";
import { Link } from "react-router";
import VideoCard, { type VideoCardData } from "../components/VideoCard";
import { useTheme } from "../components/ThemeContext";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `视频详情 #${params.id} - VideoHub` }];
}

interface VideoDetail {
  id: number;
  title: string;
  description: string;
  views: string;
  duration: string;
  rating: string;
  likes: string;
  dislikes: string;
  uploadedAt: string;
  category: string;
  tags: string[];
  uploader: { name: string; followers: string; avatar: string; verified: boolean };
  related: VideoCardData[];
}

const MOCK_DB: Record<string, VideoDetail> = {
  "1": {
    id: 1,
    title: "Sunset Beach Escape — The Perfect Weekend Getaway",
    description:
      "Join us as we escape to a hidden beach paradise for the ultimate weekend getaway. Watch the sunset paint the sky in hues of orange, pink and red as waves gently crash on the shore. This video was filmed entirely in 4K on location in Bali, Indonesia. Pack your bags and get inspired for your next adventure!",
    views: "12.4M",
    duration: "14:32",
    rating: "98%",
    likes: "482K",
    dislikes: "8.2K",
    uploadedAt: "3 天前",
    category: "旅行",
    tags: ["日落", "海滩", "旅行", "4K", "巴厘岛", "放松"],
    uploader: { name: "CoastalVibes", followers: "2.4M", avatar: "from-orange-400 to-red-500", verified: true },
    related: [
      { id: 2, title: "City Lights Night Drive — 4K Cinematic Tour", views: "9.8M", duration: "22:17", rating: "97%", likes: "398K", thumb: "from-indigo-600 via-purple-600 to-fuchsia-500", uploader: "UrbanExplorer", time: "5 天前" },
      { id: 3, title: "Mountain Peak Sunrise — Aerial Drone Footage", views: "8.2M", duration: "08:45", rating: "96%", likes: "356K", thumb: "from-sky-500 via-blue-600 to-indigo-700", uploader: "SkyHighMedia", time: "2 天前" },
      { id: 4, title: "Deep Ocean Wonders — Documentary Short", views: "7.6M", duration: "18:03", rating: "95%", likes: "312K", thumb: "from-cyan-500 via-teal-600 to-blue-800", uploader: "OceanLife", time: "1 天前" },
      { id: 5, title: "Street Food Around the World — Episode 7", views: "6.9M", duration: "15:21", rating: "94%", likes: "287K", thumb: "from-amber-500 via-orange-600 to-red-700", uploader: "FoodieGlobal", time: "4 天前" },
      { id: 6, title: "Forest Waterfall Relaxation — 3 Hour Loop", views: "6.3M", duration: "180:00", rating: "93%", likes: "265K", thumb: "from-emerald-500 via-teal-600 to-green-800", uploader: "NatureRelax", time: "6 天前" },
      { id: 7, title: "Retro Arcade Tour — 80s Gaming Paradise", views: "5.8M", duration: "12:58", rating: "92%", likes: "234K", thumb: "from-pink-500 via-fuchsia-600 to-purple-700", uploader: "RetroGamer", time: "1 天前" },
    ],
  },
};

function getVideo(id: string | undefined): VideoDetail {
  if (id && MOCK_DB[id]) return MOCK_DB[id];
  const fallbackId = id ? parseInt(id, 10) : 1;
  return {
    id: fallbackId || 1,
    title: `精彩视频 #${id ?? "1"} — 精彩内容等你发现`,
    description:
      "这是一个示例视频描述。视频内容展示了令人惊叹的画面和精彩的故事叙述。请订阅我们的频道获取更多精彩内容！",
    views: `${(Math.random() * 5 + 0.5).toFixed(1)}M`,
    duration: `${10 + Math.floor(Math.random() * 20)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    rating: `${90 + Math.floor(Math.random() * 9)}%`,
    likes: `${Math.floor(Math.random() * 500)}K`,
    dislikes: `${Math.floor(Math.random() * 20)}K`,
    uploadedAt: `${1 + Math.floor(Math.random() * 7)} 天前`,
    category: "热门推荐",
    tags: ["高清", "热门", "精选"],
    uploader: { name: "ContentCreator", followers: `${(Math.random() * 3 + 0.5).toFixed(1)}M`, avatar: "from-purple-400 to-pink-500", verified: false },
    related: MOCK_DB["1"].related,
  };
}

export default function VideoDetail({ params }: Route.ComponentProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const video = getVideo(params.id);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] flex gap-0 lg:gap-6 px-0 sm:px-4 py-4">
      {/* Main */}
      <div className="flex-1 min-w-0 max-w-full lg:max-w-[calc(100%-360px)]">
        {/* Breadcrumb */}
        <div className={`mb-3 flex items-center gap-1.5 text-xs ${isDark ? "text-gray-500" : "text-gray-500"} px-3 sm:px-0`}>
          <Link to="/" className={isDark ? "hover:text-gray-300" : "hover:text-gray-800"}>首页</Link>
          <span>/</span>
          <Link to="/categories" className={isDark ? "hover:text-gray-300" : "hover:text-gray-800"}>分类</Link>
          <span>/</span>
          <span className={isDark ? "text-gray-300" : "text-gray-700"}>{video.category}</span>
        </div>

        {/* Video Player */}
        <div className="px-3 sm:px-0">
          <div className={`relative w-full aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 ${isDark ? "" : "ring-1 ring-gray-200"}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-600/90 hover:bg-orange-500 transition-colors shadow-xl">
                <svg className="h-10 w-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
              {video.duration}
            </div>
          </div>
        </div>

        {/* Title & Meta */}
        <div className="mt-4 px-3 sm:px-0">
          <h1 className={`text-lg sm:text-2xl font-bold leading-snug ${isDark ? "text-white" : "text-gray-900"}`}>{video.title}</h1>

          <div className={`mt-2 flex flex-wrap items-center gap-3 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {video.views} 观看
            </span>
            <span>·</span>
            <span>{video.uploadedAt}</span>
            <span className={`flex items-center gap-1 text-orange-500`}>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {video.rating} 好评
            </span>
          </div>
        </div>

        {/* Actions Bar */}
        <div className={`mt-4 flex flex-wrap items-center gap-2 px-3 sm:px-0 ${isDark ? "" : ""}`}>
          <div className={`flex items-center rounded-full overflow-hidden border ${isDark ? "border-[#262630]" : "border-gray-200"}`}>
            <button
              onClick={() => { setLiked(!liked); if (disliked) setDisliked(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${liked ? "text-orange-500 bg-orange-500/10" : isDark ? "text-gray-400 hover:bg-[#1a1a22] hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {video.likes}
            </button>
            <div className={`h-6 w-px ${isDark ? "bg-[#262630]" : "bg-gray-200"}`} />
            <button
              onClick={() => { setDisliked(!disliked); if (liked) setLiked(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${disliked ? "text-red-500 bg-red-500/10" : isDark ? "text-gray-400 hover:bg-[#1a1a22] hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" />
              </svg>
            </button>
          </div>

          <button className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isDark ? "border-[#262630] text-gray-300 hover:border-gray-500 hover:text-white hover:bg-[#1a1a22]" : "border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            分享
          </button>

          <button className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isDark ? "border-[#262630] text-gray-300 hover:border-gray-500 hover:text-white hover:bg-[#1a1a22]" : "border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            收藏
          </button>
        </div>

        {/* Uploader Card */}
        <div className={`mt-5 flex items-center justify-between rounded-xl p-4 ${isDark ? "bg-[#15151c]" : "bg-white border border-gray-200"} transition-colors duration-300 mx-3 sm:mx-0`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${video.uploader.avatar} flex-shrink-0`}></div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{video.uploader.name}</span>
                {video.uploader.verified && (
                  <svg className="h-4 w-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{video.uploader.followers} 粉丝</p>
            </div>
          </div>
          <button
            onClick={() => setSubscribed(!subscribed)}
            className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              subscribed
                ? `${isDark ? "bg-[#252530] text-gray-300 hover:bg-[#2a2a36]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
                : "bg-orange-600 text-white hover:bg-orange-500"
            }`}
          >
            {subscribed ? "已订阅" : "订阅"}
          </button>
        </div>

        {/* Description */}
        <div className={`mt-5 rounded-xl p-4 ${isDark ? "bg-[#15151c]" : "bg-white border border-gray-200"} mx-3 sm:mx-0`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {video.tags.map((tag) => (
              <Link
                key={tag}
                to="/categories"
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  isDark ? "bg-[#1a1a22] text-gray-300 hover:bg-[#252530] hover:text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                #{tag}
              </Link>
            ))}
          </div>
          <p className={`text-sm leading-relaxed whitespace-pre-line ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {video.description}
          </p>
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <aside className="hidden lg:block w-[340px] xl:w-[380px] flex-shrink-0 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto pr-1">
        <h2 className={`mb-3 text-sm font-semibold px-1 ${isDark ? "text-white" : "text-gray-900"}`}>相关推荐</h2>
        <div className="space-y-3">
          {video.related.map((rv) => (
            <Link key={rv.id} to={`/video/${rv.id}`} className="group flex gap-3">
              <div className={`relative w-40 flex-shrink-0 aspect-video rounded-lg bg-gradient-to-br ${rv.thumb} overflow-hidden`}>
                <div className={`absolute inset-0 transition-colors ${isDark ? "bg-black/10" : "bg-black/5"} group-hover:bg-black/0`} />
                <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                  {rv.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`line-clamp-2 text-sm font-medium leading-snug ${isDark ? "text-gray-100" : "text-gray-900"} group-hover:text-orange-500 transition-colors`}>
                  {rv.title}
                </h3>
                <p className={`mt-1 text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{rv.uploader}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{rv.views} 观看 · {rv.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}