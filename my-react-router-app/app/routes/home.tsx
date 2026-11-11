import { env } from "cloudflare:workers";

import type { Route } from "./+types/home";
import { useMemo, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "足球比分_篮球分析_比分直播_足球比分直播 – 捷报比分网" },
    { name: "description", content: "捷报比分网提供足球比分、篮球分析、比分直播、足球比分直播，全年365日不间断更新。" },
  ];
}

export function loader() {
  return { message: env.VALUE_FROM_CLOUDFLARE };
}

const subMenuItems = ["最新前瞻", "足球分析", "篮球分析", "临场专区", "大咖排行"];

const hotLeagues = ["综合", "NBA", "英锦赛", "国际友谊", "韩篮甲", "日篮B1", "欧协杯", "西杯"];

interface RecommendMatch {
  home: string;
  homeLogo: string;
  away: string;
  awayLogo: string;
  score?: string;
  time?: string;
  recCount: number;
}

const recommendMatches: RecommendMatch[] = [
  { home: "卡塔尔U23", homeLogo: "//info.nowscore.com/Image/team/images/1h4qpjbhpqb.png", away: "新加坡U23", awayLogo: "//info.nowscore.com/Image/team/images/1h4qpagh0m26.png", score: "0-0", recCount: 10 },
  { home: "越南U23", homeLogo: "//info.nowscore.com/Image/team/images/1h59nztqfq2h.png", away: "泰国U23", awayLogo: "//info.nowscore.com/Image/team/images/165726898169.png", time: "11-10 20:00", recCount: 10 },
  { home: "克鲁", homeLogo: "//info.nowscore.com/Image/team/images/67/1m01grd7232h.png", away: "维冈竞技", awayLogo: "//info.nowscore.com/Image/team/images/61/1m0khncptp2d.png", time: "11-11 03:00", recCount: 10 },
  { home: "布里斯托流", homeLogo: "//info.nowscore.com/Image/team/images/1190/1m01grk31kq.png", away: "哈德斯", awayLogo: "//info.nowscore.com/Image/team/images/61/1m01grd7232h.png", time: "11-11 03:00", recCount: 2 },
];

interface Expert {
  name: string;
  avatar: string;
  winRate: string;
}

const experts: Expert[] = [
  { name: "预测未来1", avatar: "//pic.nowscore.com/Files/guess/users/390661_20231030062354.jpg", winRate: "70%" },
  { name: "数据大师", avatar: "//pic.nowscore.com/Files/guess/users/611685_20260417121141.jpg", winRate: "68%" },
  { name: "绿茵解球", avatar: "//pic.nowscore.com//Files/News/tag/26f4da37-bec5-4d84-aff3-81c5ac6d919e.jpg", winRate: "65%" },
  { name: "球神波菲特", avatar: "//pic.nowscore.com//Files/News/tag/efad15aa-0c26-4428-872a-c1266a6381e9.jpg", winRate: "62%" },
];

interface HotAuthor {
  rank: number;
  name: string;
  avatar: string;
  tag: string;
  matchTime: string;
  home: string;
  away: string;
  score?: string;
}

const hotAuthors: HotAuthor[] = [
  { rank: 4, name: "推演士", avatar: "//pic.nowscore.com//Files/News/tag/26f4da37-bec5-4d84-aff3-81c5ac6d919e.jpg", tag: "人气第1", matchTime: "20:00", home: "辛达卡拉U23", away: "杜连斯U23" },
  { rank: 5, name: "体坛王指导", avatar: "//pic.nowscore.com//Files/guess/users/611685_20260417121141.jpg", tag: "人气第2", matchTime: "16:00", home: "卡塔尔U23", away: "新加坡U23", score: "0-0" },
  { rank: 1, name: "小明童鞋", avatar: "//pic.nowscore.com//Files/News/tag/efad15aa-0c26-4428-872a-c1266a6381e9.jpg", tag: "近8中6 人气第3", matchTime: "03:00", home: "伯顿", away: "诺茨郡" },
  { rank: 2, name: "名嘴老杨", avatar: "//pic.nowscore.com//Files/News/tag/26f4da37-bec5-4d84-aff3-81c5ac6d919e.jpg", tag: "人气第4", matchTime: "16:45", home: "雪兰莪U20", away: "达罗塔晋C队U" },
];

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

function recordClass(type: NewsItem["recordType"]) {
  switch (type) {
    case "Rident":
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400";
    case "league":
      return "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400";
    default:
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [activeSub, setActiveSub] = useState(0);
  const [activeLeague, setActiveLeague] = useState("综合");
  const [expertTab, setExpertTab] = useState<"gaoshou" | "daka">("gaoshou");

  const filtered = useMemo(() => {
    if (activeLeague === "综合") return newsItems;
    return newsItems.filter((n) => n.league === activeLeague);
  }, [activeLeague]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <SiteHeader />

      {/* Banner / Ad placeholder */}
      <div className="bg-gradient-to-r from-[#0f9d58] to-[#2ecc71]">
        <div className="mx-auto max-w-6xl px-3 py-4 text-center text-white sm:px-4">
          <p className="text-sm font-medium sm:text-base">捷报比分网 · 足球比分 · 篮球分析 · 比分直播</p>
          <p className="mt-1 text-xs text-[#e8f5e9]">全年365日不间断更新 · 球迷和彩民首选的足球比分直播网站</p>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-3 py-4 sm:px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
          {/* Left column - news list */}
          <div className="min-w-0">
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
                    ? "bg-[#0f9d58] text-white"
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
                  ? "border-[#0f9d58] font-bold text-[#0f9d58]"
                  : "border-transparent text-gray-600 hover:text-[#0f9d58] dark:text-gray-300"
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
                    <h3 className="line-clamp-1 text-sm font-bold text-gray-900 hover:text-[#0f9d58] dark:text-gray-100 dark:hover:text-green-400 sm:text-base">
                      {item.title}
                    </h3>
                  </a>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                    {item.desc}
                  </p>

                  {/* Match info */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 rounded bg-gray-50 px-2 py-1.5 text-xs dark:bg-gray-800/60">
                    <span className="rounded bg-[#0f9d58] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {item.label}
                    </span>
                    <span className="font-medium text-[#0f9d58] dark:text-green-400">{item.league}</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.time}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.home} <span className="text-gray-400">vs</span> {item.away}
                    </span>
                  </div>

                  {/* Author + record */}
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <a href="#" className="text-[#0f9d58] hover:underline dark:text-[#4ade80]">
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
          </div>

          {/* Right column - sidebar */}
          <aside className="space-y-3">
            {/* App download QR code */}
            <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <img
                  src="//www.nowscore.com/images/wap/qrcode.20200103.01.png"
                  alt="捷报比分客户端"
                  className="h-16 w-16 shrink-0 rounded"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">捷报比分客户端</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">更便捷获取比分、数据、分析</p>
                  <div className="mt-2 flex gap-2">
                    <a href="//m.nowscore.com" target="_blank" rel="noreferrer" className="rounded bg-[#0f9d58] px-2 py-1 text-xs text-white hover:bg-[#0a7d47]">
                      苹果访问
                    </a>
                    <a href="//www.nowscore.com/app/nowscore.apk" target="_blank" rel="noreferrer" className="rounded bg-[#0f9d58] px-2 py-1 text-xs text-white hover:bg-[#0a7d47]">
                      安卓版下载
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP banner */}
            <a href="//guess.nowscore.com/vip" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-extrabold text-white">VIP 会员</p>
                  <p className="text-xs text-yellow-100">大咖推荐 · 临场直击</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-600">立即开通</span>
              </div>
            </a>

            {/* Match recommendations */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
              <div className="border-b border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-800/60">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">赛事推荐</h2>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {recommendMatches.map((m, i) => (
                  <li key={i} className="flex items-center justify-between gap-1 px-3 py-2 text-xs">
                    <div className="flex w-1/3 flex-col items-center gap-1">
                      <img src={m.homeLogo} alt={m.home} className="h-7 w-7 object-contain" loading="lazy" />
                      <span className="line-clamp-1 text-center text-gray-700 dark:text-gray-300">{m.home}</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-1">
                      {m.score ? (
                        <a href="#" className="font-bold text-green-600 dark:text-green-400">{m.score}</a>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">{m.time}</span>
                      )}
                      <a href="#" className="text-[10px] text-[#0f9d58] hover:underline dark:text-[#4ade80]">
                        {m.recCount}条推荐
                      </a>
                    </div>
                    <div className="flex w-1/3 flex-col items-center gap-1">
                      <img src={m.awayLogo} alt={m.away} className="h-7 w-7 object-contain" loading="lazy" />
                      <span className="line-clamp-1 text-center text-gray-700 dark:text-gray-300">{m.away}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experts: 高手 / 实力大咖 */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
              <div className="flex border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/60">
                <button
                  type="button"
                  onClick={() => setExpertTab("gaoshou")}
                  className={`flex-1 py-2 text-sm font-bold transition-colors ${
                    expertTab === "gaoshou" ? "text-[#0f9d58]" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  高手
                </button>
                <button
                  type="button"
                  onClick={() => setExpertTab("daka")}
                  className={`flex-1 py-2 text-sm font-bold transition-colors ${
                    expertTab === "daka" ? "text-[#0f9d58]" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  实力大咖
                </button>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {experts.map((e, i) => (
                  <li key={i}>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <img src={e.avatar} alt={e.name} className="h-9 w-9 shrink-0 rounded-full object-cover" loading="lazy" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{e.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          胜率 <span className="font-bold text-[#0f9d58] dark:text-green-400">{e.winRate}</span>
                        </p>
                      </div>
                      <span className="shrink-0 rounded bg-[#0f9d58] px-2 py-0.5 text-[10px] font-semibold text-white">查看</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hot authors */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
              <div className="border-b border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-800/60">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">热门作者</h2>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {hotAuthors.map((a, i) => (
                  <li key={i} className="px-3 py-2">
                    <a href="#" className="flex items-center gap-2">
                      <span className="relative shrink-0">
                        <img src={a.avatar} alt={a.name} className="h-9 w-9 rounded-full object-cover" loading="lazy" />
                        <span className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                          a.rank <= 3 ? "bg-[#0f9d58]" : "bg-gray-400"
                        }`}>
                          {a.rank}
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{a.name}</p>
                        <p className="truncate text-[10px] text-[#0f9d58] dark:text-green-400">{a.tag}</p>
                      </div>
                    </a>
                    <a href="#" className="mt-1.5 flex items-center gap-1 rounded bg-gray-50 px-2 py-1 text-[11px] dark:bg-gray-800/60">
                      <span className="text-gray-500 dark:text-gray-400">{a.matchTime}</span>
                      <span className="truncate text-gray-700 dark:text-gray-300">{a.home}</span>
                      {a.score ? (
                        <span className="font-bold text-green-600 dark:text-green-400">{a.score}</span>
                      ) : (
                        <span className="text-gray-400">VS</span>
                      )}
                      <span className="truncate text-gray-700 dark:text-gray-300">{a.away}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          数据仅供参考 · Cloudflare env: {loaderData.message}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}