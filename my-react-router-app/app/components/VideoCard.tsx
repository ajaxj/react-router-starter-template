import { Link } from "react-router";
import { useTheme } from "../components/ThemeContext";

export interface VideoCardData {
  id: number;
  rank?: number;
  title: string;
  views: string;
  duration: string;
  rating: string;
  likes: string;
  thumb: string;
  uploader: string;
  time: string;
}

const medalBg: Record<number, string> = {
  1: "#ffd700",
  2: "#c0c0c0",
  3: "#cd7f32",
};

export default function VideoCard({ video }: { video: VideoCardData }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link to={`/video/${video.id}`} className="group relative block">
      {video.rank && video.rank <= 3 ? (
        <div
          className="absolute -left-1 -top-1 z-10 flex h-8 w-8 items-center justify-center rounded-md text-sm font-black text-black shadow-lg"
          style={{ background: medalBg[video.rank] }}
        >
          #{video.rank}
        </div>
      ) : video.rank ? (
        <div className="absolute left-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded bg-black/70 text-xs font-bold text-gray-300">
          #{video.rank}
        </div>
      ) : null}

      <div className={`overflow-hidden rounded-lg ${isDark ? "bg-[#15151c] group-hover:bg-[#1a1a22]" : "bg-white group-hover:bg-gray-100"} transition-colors duration-300`}>
        <div className={`relative aspect-video bg-gradient-to-br ${video.thumb} overflow-hidden`}>
          <div className={`absolute inset-0 transition-colors ${isDark ? "bg-black/10" : "bg-black/5"} group-hover:bg-black/0`} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
              <svg className="h-6 w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </div>
          <div className="absolute top-2 right-2 rounded bg-orange-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
            HD
          </div>
        </div>

        <div className="p-3">
          <h3 className={`mb-2 line-clamp-2 text-sm font-medium ${isDark ? "text-gray-100" : "text-gray-900"} group-hover:text-orange-500 transition-colors leading-snug`}>
            {video.title}
          </h3>
          <div className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            <span className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              <span className={`h-5 w-5 rounded-full bg-gradient-to-br ${video.thumb} flex-shrink-0`}></span>
              <span className="truncate">{video.uploader}</span>
            </span>
          </div>
          <div className={`mt-2 flex items-center gap-3 text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {video.views}
            </span>
            <span className="flex items-center gap-1 text-orange-500">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {video.rating}
            </span>
            <span className="ml-auto flex-shrink-0">{video.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}