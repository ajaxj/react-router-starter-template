import { env } from "cloudflare:workers";

import type { Route } from "./+types/home";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "足球比分_篮球分析_比分直播_足球比分直播 – 捷报比分网" },
    { name: "description", content: "捷报比分网提供足球比分、篮球分析、比分直播、足球比分直播，全年365日不间断更新。" },
  ];
}

export function loader() {
  return { message: env.VALUE_FROM_CLOUDFLARE };
}

interface TopNavItem {
  label: string;
  to?: string;
  end?: boolean;
  href?: string;
  badge?: string;
}

const topNavItems: TopNavItem[] = [
  { label: "首页", to: "/", end: true },
  { label: "足球", href: "#" },
  { label: "篮球", href: "#" },
  { label: "AI预测", href: "#" },
  { label: "计划单", href: "#", badge: "NEW" },
  { label: "捷报猫", href: "#", badge: "免费" },
  { label: "预测", href: "#" },
  { label: "竞彩", href: "#" },
  { label: "资料库", href: "#" },
  { label: "会员", href: "#", badge: "优惠" },
];

const subMenuItems = ["最新前瞻", "足球分析", "篮球分析", "临场专区", "大咖排行"];

const hotLeagues = ["综合", "NBA", "英锦赛", "国际友谊", "韩篮甲", "日篮B1", "欧协杯", "西杯"];

interface NewsItem {
  id: string;
  title: string;
  desc: string;
  img: string;
  label: string;
  league: string;
  time: string;
  home: string;
  away: string;
  author: string;
  record: string;
  recordType: "zhanji" | "Rident" | "league";
}

const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "【鍾心场】泰U21：博乐大学U21 VS 普拉查普U21",
    desc: "博乐大学U21坐镇主场，队伍以校园球员组建，近五轮赛事拿到2胜2平1负，场均可以完成接近2次破门，前场跑动穿插积极，擅长依托边路拉扯空间。",
    img: "https://pic.nowscore.com/Files/News/default/161.jpg",
    label: "进球数",
    league: "泰U21",
    time: "16:30",
    home: "博乐大学U21",
    away: "普拉查普U21",
    author: "球神波菲特",
    record: "近9中6",
    recordType: "zhanji",
  },
  {
    id: "n2",
    title: "老杨超信心：马统杯16:45雪兰莪-达罗塔晋",
    desc: "深耕赛场现场，聚焦前沿赛事与热点解读。以专业视角剖析战术，带您畅聊足篮百态。",
    img: "https://pic.nowscore.com/Files/News/default/161.jpg",
    label: "进球数",
    league: "马统杯",
    time: "16:45",
    home: "雪兰莪U20",
    away: "达罗塔晋C队U",
    author: "名嘴老杨",
    record: "近20中12",
    recordType: "zhanji",
  },
  {
    id: "n3",
    title: "亚锦标【直播场次核心】多伦多运通vs广州朗肽海本B队",
    desc: "亚洲篮球联赛（TAT）常规赛，多伦多运通主场迎战广州朗肽海本B队。广州B队近期在赛事中连续取胜，状态火热。",
    img: "https://pic.nowscore.com/Files/News/default/162.jpg",
    label: "让分",
    league: "亚锦标",
    time: "17:00",
    home: "多伦多运通",
    away: "广州B队",
    author: "林总归来",
    record: "最长9连红",
    recordType: "Rident",
  },
  {
    id: "n4",
    title: "菲NCAA17时拆解圣贝达红狮vsCSB巴拉泽斯",
    desc: "昨菲NCAA获胜，菲NCAA三连胜+近5胜4，拆解午场赛连胜拆解给力！精选比赛拆解本期再创连胜新高度。",
    img: "https://pic.nowscore.com/Files/News/tag/46f618f1-d602-4894-8cdc-ea83ec900a98.png",
    label: "让分",
    league: "菲NCAA",
    time: "17:00",
    home: "圣贝达红狮",
    away: "CSB巴拉泽斯",
    author: "基斯迪",
    record: "菲NCAA3连红",
    recordType: "league",
  },
  {
    id: "n5",
    title: "每日仅一场【压轴鐘心】信心等级拉满！请放心！",
    desc: "本场赛事，体坛王指导将从球队的基本面、战术部署、人员伤停、以及最终的潘口推敲给出精准的解析！",
    img: "https://pic.nowscore.com/Files/News/default/161.jpg",
    label: "让球",
    league: "国际友谊",
    time: "18:00",
    home: "加蓬女足",
    away: "乍得女足",
    author: "体坛王指导",
    record: "最长10连红",
    recordType: "Rident",
  },
  {
    id: "n6",
    title: "韩篮来袭，太阳神VS高阳如何？",
    desc: "昨天状态不好，调整一下，今天只有一场韩篮的比赛，稳住争取拿下，低迷只是暂时！",
    img: "https://pic.nowscore.com/Files/News/tag/2eb8d809-d521-4077-8739-d5c8bd9f1b1f.jpg",
    label: "让分",
    league: "韩篮甲",
    time: "18:00",
    home: "太阳神",
    away: "索诺天枪",
    author: "遥梦看篮球",
    record: "最长11连红",
    recordType: "Rident",
  },
  {
    id: "n7",
    title: "全天精研深思《超核心篮球》方向已反复确认，可放心",
    desc: "成绩点评：收收收，大丰收，昨天多场热门焦点场次都红了，状态达到巅峰，近期比较稳定，非常顺利。",
    img: "https://pic.nowscore.com/Files/News/tag/13d2e2d8-4d77-421e-87d7-d53874e71d4b.jpg",
    label: "大小分",
    league: "韩篮甲",
    time: "18:00",
    home: "太阳神",
    away: "索诺天枪",
    author: "乌尔吉",
    record: "最长12连红",
    recordType: "Rident",
  },
  {
    id: "n8",
    title: "（临场重点）太阳神PK高阳，两队今天如何战？",
    desc: "儒墨心语：做好做足功课，不海推，不烂推，认真专注质量，每一场都必须反复敲定，再三确认。",
    img: "https://pic.nowscore.com/Files/News/tag/2eb8d809-d521-4077-8739-d5c8bd9f1b1f.jpg",
    label: "让分",
    league: "韩篮甲",
    time: "18:00",
    home: "太阳神",
    away: "高阳",
    author: "儒墨",
    record: "近15中10",
    recordType: "zhanji",
  },
];

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 inline-block">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function recordClass(type: NewsItem["recordType"]) {
  switch (type) {
    case "Rident":
      return "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400";
    case "league":
      return "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400";
    default:
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400";
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { theme, toggle } = useTheme();
  const [activeSub, setActiveSub] = useState(0);
  const [activeLeague, setActiveLeague] = useState("综合");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeLeague === "综合") return newsItems;
    return newsItems.filter((n) => n.league === activeLeague);
  }, [activeLeague]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Top Navigation Bar - purple theme like nowscore */}
      <header className="sticky top-0 z-50 shadow-md">
        <div className="bg-[#51409d]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-lg font-bold text-white">
                捷
              </div>
              <div className="hidden flex-col leading-none sm:flex">
                <span className="text-base font-bold text-white">捷报比分</span>
                <span className="text-[10px] text-[#DBD3FF]">NOWSCORE</span>
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
                        isActive ? "bg-[#7159DD] font-bold text-white" : "text-[#DBD3FF] hover:bg-[#443587]"
                      }`
                    }
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -right-0.5 top-1 rounded bg-orange-500 px-1 text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="relative px-3.5 py-[18px] text-[15px] text-[#DBD3FF] transition-colors hover:bg-[#443587]"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -right-0.5 top-1 rounded bg-orange-500 px-1 text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                )
              )}
              <a href="#" className="px-3.5 py-[18px] text-[15px] text-[#DBD3FF] transition-colors hover:bg-[#443587]">
                更多 <ChevronDown />
              </a>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label="切换日夜模式"
                className="flex h-9 w-9 items-center justify-center rounded-md text-[#DBD3FF] transition-colors hover:bg-[#443587]"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
              <a href="#" className="hidden text-sm text-[#DBD3FF] hover:text-yellow-300 sm:block">
                登录/注册
              </a>
              <a href="#" className="hidden items-center gap-1 text-sm text-[#DBD3FF] hover:text-yellow-300 md:flex">
                APP下载
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-[#DBD3FF] hover:bg-[#443587] lg:hidden"
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
          <div className="border-t border-[#443587] bg-[#51409d] lg:hidden">
            <div className="mx-auto grid max-w-6xl grid-cols-3 gap-px px-3 py-2">
              {topNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.to ?? item.href}
                  className="rounded px-2 py-2 text-center text-sm text-[#DBD3FF] hover:bg-[#443587]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Banner / Ad placeholder */}
      <div className="bg-gradient-to-r from-[#51409d] to-[#7159DD]">
        <div className="mx-auto max-w-6xl px-3 py-4 text-center text-white sm:px-4">
          <p className="text-sm font-medium sm:text-base">捷报比分网 · 足球比分 · 篮球分析 · 比分直播</p>
          <p className="mt-1 text-xs text-[#DBD3FF]">全年365日不间断更新 · 球迷和彩民首选的足球比分直播网站</p>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-3 py-4 sm:px-4">
        {/* Sub menu (newsMenu) */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex gap-1 overflow-x-auto">
            {subMenuItems.map((item, idx) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveSub(idx)}
                className={`whitespace-nowrap rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  activeSub === idx
                    ? "bg-[#51409d] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            筛选
          </button>
        </div>

        {/* Hot leagues tabs */}
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 pb-px dark:border-gray-800">
          {hotLeagues.map((lg) => (
            <button
              key={lg}
              type="button"
              onClick={() => setActiveLeague(lg)}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-colors ${
                activeLeague === lg
                  ? "border-[#e9410f] font-bold text-[#e9410f]"
                  : "border-transparent text-gray-600 hover:text-[#e9410f] dark:text-gray-300"
              }`}
            >
              {lg}
            </button>
          ))}
        </div>

        {/* News list */}
        <ul className="space-y-3">
          {filtered.length === 0 && (
            <li className="rounded-lg border border-dashed border-gray-300 bg-white py-12 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900">
              暂无推荐内容
            </li>
          )}

          {filtered.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
            >
              <div className="flex flex-col p-3 sm:flex-row sm:gap-4 sm:p-4">
                {/* Image */}
                <a href="#" className="block shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-24 w-full rounded object-cover sm:h-[90px] sm:w-[148px]"
                    loading="lazy"
                  />
                </a>

                {/* Content */}
                <div className="mt-2 min-w-0 flex-1 sm:mt-0">
                  <a href="#" className="block">
                    <h3 className="line-clamp-1 text-sm font-bold text-gray-900 hover:text-[#e9410f] dark:text-gray-100 dark:hover:text-orange-400 sm:text-base">
                      {item.title}
                    </h3>
                  </a>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                    {item.desc}
                  </p>

                  {/* Match info */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 rounded bg-gray-50 px-2 py-1.5 text-xs dark:bg-gray-800/60">
                    <span className="rounded bg-[#51409d] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {item.label}
                    </span>
                    <span className="font-medium text-[#e9410f] dark:text-orange-400">{item.league}</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.time}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.home} <span className="text-gray-400">vs</span> {item.away}
                    </span>
                  </div>

                  {/* Author + record */}
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <a href="#" className="text-[#51409d] hover:underline dark:text-[#a78bfa]">
                      {item.author}
                    </a>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${recordClass(item.recordType)}`}>
                      {item.record}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Load more */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            加载更多
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          数据仅供参考 · Cloudflare env: {loaderData.message}
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 捷报比分网 nowscore.com · 足球比分_篮球分析_比分直播</p>
          <p className="mt-1">本站所有数据仅供参考，不构成任何投注建议</p>
        </div>
      </footer>
    </div>
  );
}