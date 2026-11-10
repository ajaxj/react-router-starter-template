import { useEffect, useState } from "react";
import type { Route } from "./+types/home";

import Section from "~/components/section";
import ShowCard from "~/components/show-card";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "美剧天堂-最新美剧下载-好看的美剧排行榜" },
    { name: "description", content: "美剧天堂提供2026年最新美剧资源下载与在线观看，涵盖魔幻、科幻、灵异、都市、犯罪等各类热门美剧，第一时间更新高清美剧资源。" },
  ];
}

const quickCategories = [
  "魔幻/科幻", "灵异/惊悚", "都市/情感", "犯罪/历史", "选秀/综艺", "动漫/卡通", "电影",
];

const banners = [
  { title: "龙之家族第三季", desc: "坦格利安家族的内战即将爆发", img: "https://cdn.04pic.com/image/6a3994a092e43.jpg" },
  { title: "幻视任务", desc: "白幻视踏上寻找自我的旅程", img: "https://cdn.04pic.com/image/6acfadddb7ca0.jpg" },
  { title: "羊毛战记第三季", desc: "地堡之下的真相逐渐揭开", img: "https://cdn.04pic.com/image/6a46de60f347c.jpg" },
];

const latestUpdates = [
  { title: "古战场传奇：吾血之亲第二季", type: "魔幻/科幻", status: "更新至8集", date: "11-08" },
  { title: "幻视任务", type: "魔幻/科幻", status: "更新至7集", date: "11-08" },
  { title: "小先知", type: "魔幻/科幻", status: "更新至6集", date: "11-07" },
  { title: "方舟一号第三季", type: "魔幻/科幻", status: "更新至12集", date: "11-07" },
  { title: "绿灯军团", type: "魔幻/科幻", status: "更新至8集", date: "11-06" },
  { title: "女巫团学院", type: "魔幻/科幻", status: "更新至21集", date: "11-06" },
  { title: "斯图尔特未能拯救宇宙", type: "魔幻/科幻", status: "更新至10集", date: "11-05" },
  { title: "星际迷航：奇异新世界第四季", type: "魔幻/科幻", status: "更新至10集", date: "11-05" },
  { title: "图书馆员：下一章第二季", type: "魔幻/科幻", status: "更新至12集", date: "11-04" },
  { title: "梦魇绝镇第四季", type: "魔幻/科幻", status: "更新至10集", date: "11-04" },
  { title: "龙之家族第三季", type: "魔幻/科幻", status: "更新至8集", date: "11-03" },
  { title: "基地第三季", type: "魔幻/科幻", status: "更新至10集", date: "11-03" },
];

const scifiShows = [
  { title: "龙之家族第三季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a3994a092e43.jpg" },
  { title: "幻视任务", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6acfadddb7ca0.jpg" },
  { title: "羊毛战记第三季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a46de60f347c.jpg" },
  { title: "古战场传奇：吾血之亲第二季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6aad6be8be4b3.jpg" },
  { title: "基地第三季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6870c49f8164f.jpg" },
  { title: "时光之轮第三季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/67d2fa26e5ebf.jpg" },
  { title: "星城", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a195095351d0.jpg" },
  { title: "谜之屋", status: "更新至3集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a4f83e21bd97.jpg" },
  { title: "降世神通：最后的气宗第二季", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a3eb26e603c8.jpg" },
  { title: "百年孤独第二季", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a7363550ed69.jpg" },
];

const thrillerShows = [
  { title: "梦魇绝镇第四季", status: "更新至10集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/69e6a455cdf00.jpg" },
  { title: "谜之屋", status: "更新至3集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/6a4f83e21bd97.jpg" },
  { title: "雪国列车第四季", status: "更新至10集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/66960cbda31da.jpg" },
  { title: "星城", status: "更新至8集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/6a195095351d0.jpg" },
  { title: "绿灯军团", status: "更新至8集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/6a8345b7e7f68.jpg" },
  { title: "女巫团学院", status: "更新至21集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/6ac8190983c02.jpg" },
  { title: "最后生还者第二季", status: "更新至7集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/66d4b0a90e2c3.jpg" },
  { title: "怪奇物语第五季", status: "更新至8集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/67f8b81e8c5da.jpg" },
  { title: "行尸走肉：存活之人第二季", status: "更新至6集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/69c3f7a1b8d4e.jpg" },
  { title: "极地恶灵第三季", status: "更新至10集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/68e5d2c9b1a7f.jpg" },
];

const urbanShows = [
  { title: "白莲花度假村第三季", status: "更新至8集", type: "都市/情感", img: "https://cdn.04pic.com/image/67a2b3c4d5e6f.jpg" },
  { title: "镀金时代第三季", status: "更新至8集", type: "都市/情感", img: "https://cdn.04pic.com/image/68b3c4d5e6f7a.jpg" },
  { title: "布里奇顿第三季", status: "更新至8集", type: "都市/情感", img: "https://cdn.04pic.com/image/69c4d5e6f7a8b.jpg" },
  { title: "艾米丽在巴黎第四季", status: "更新至10集", type: "都市/情感", img: "https://cdn.04pic.com/image/6ad5e6f7a8b9c.jpg" },
  { title: "欲望都市：仅此而已第三季", status: "更新至11集", type: "都市/情感", img: "https://cdn.04pic.com/image/6be6f7a8b9c0d.jpg" },
  { title: "保姆俱乐部第三季", status: "更新至10集", type: "都市/情感", img: "https://cdn.04pic.com/image/6cf7a8b9c0d1e.jpg" },
  { title: "心跳漏一拍第四季", status: "更新至8集", type: "都市/情感", img: "https://cdn.04pic.com/image/6df8b9c0d1e2f.jpg" },
  { title: "足球教练第四季", status: "更新至12集", type: "都市/情感", img: "https://cdn.04pic.com/image/6ef9c0d1e2f3a.jpg" },
  { title: "我们有人在撒谎第三季", status: "更新至8集", type: "都市/情感", img: "https://cdn.04pic.com/image/6ff0d1e2f3a4b.jpg" },
  { title: "好想做一次第五季", status: "更新至10集", type: "都市/情感", img: "https://cdn.04pic.com/image/70f1e2f3a4b5c.jpg" },
];

const crimeShows = [
  { title: "斯图尔特未能拯救宇宙", status: "更新至10集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/6a67600b2202a.jpg" },
  { title: "图书馆员：下一章第二季", status: "更新至12集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/6a738d20599b7.jpg" },
  { title: "小先知", status: "更新至6集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/69b0276e8eba3.jpg" },
  { title: "方舟一号第三季", status: "更新至12集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/6a7364f465525.jpg" },
  { title: "星际迷航：奇异新世界第四季", status: "更新至10集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/6a67606133296.jpg" },
  { title: "降世神通：最后的气宗第二季", status: "更新至7集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/6a3eb26e603c8.jpg" },
  { title: "终极名单第二季", status: "更新至8集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/628b5c29dc13b.jpg" },
  { title: "1923第二季", status: "更新至8集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/67e5f6a7b8c9d.jpg" },
  { title: "黄石第六季", status: "更新至14集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/68f6a7b8c9d0e.jpg" },
  { title: "火线警探：原始城市第二季", status: "更新至8集", type: "犯罪/历史", img: "https://cdn.04pic.com/image/69f7b8c9d0e1f.jpg" },
];

const varietyShows = [
  { title: "周六夜现场第五十季", status: "更新至21集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/6a01b2c3d4e5f.jpg" },
  { title: "艾伦秀第二十季", status: "更新至30集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/6b12c3d4e5f6a.jpg" },
  { title: "美国之声第二十六季", status: "更新至24集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/6c23d4e5f6a7b.jpg" },
  { title: "鲁保罗变装皇后秀第十六季", status: "更新至14集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/6d34e5f6a7b8c.jpg" },
  { title: "厨艺大师第十五季", status: "更新至20集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/6e45f6a7b8c9d.jpg" },
  { title: "全美超模大赛第二十五季", status: "更新至16集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/6f56a7b8c9d0e.jpg" },
  { title: "柯南秀第十五季", status: "更新至30集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/7067b8c9d0e1f.jpg" },
  { title: "肥伦秀第十二季", status: "更新至28集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/7178c9d0e1f2a.jpg" },
  { title: "吉米鸡毛秀第二十二季", status: "更新至26集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/7289d0e1f2a3b.jpg" },
  { title: "约翰·奥利弗上周今夜秀第十二季", status: "更新至28集", type: "选秀/综艺", img: "https://cdn.04pic.com/image/739ae1f2a3b4c.jpg" },
];

const animeShows = [
  { title: "辛普森一家第三十七季", status: "更新至15集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6ab1c2d3e4f5a.jpg" },
  { title: "瑞克和莫蒂第八季", status: "更新至10集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6bc2d3e4f5a6b.jpg" },
  { title: "恶搞之家第二十四季", status: "更新至18集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6cd3e4f5a6b7c.jpg" },
  { title: "飞出个未来第十二季", status: "更新至10集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6de4f5a6b7c8d.jpg" },
  { title: "南方公园第二十八季", status: "更新至10集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6ef5a6b7c8d9e.jpg" },
  { title: "降世神通：最后的气宗第二季", status: "更新至7集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6a3eb26e603c8.jpg" },
  { title: "蓝眼武士第二季", status: "更新至8集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/6ff6b7c8d9e0f.jpg" },
  { title: "外星也难民第六季", status: "更新至11集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/70f7c8d9e0f1a.jpg" },
  { title: "哈莉·奎茵第五季", status: "更新至10集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/71f8d9e0f1a2b.jpg" },
  { title: "无敌少侠第三季", status: "更新至8集", type: "动漫/卡通", img: "https://cdn.04pic.com/image/72f9e0f1a2b3c.jpg" },
];

const movieShows = [
  { title: "沙丘：第二部", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/6a11b2c3d4e5f.jpg" },
  { title: "奥本海默", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/6b22c3d4e5f6a.jpg" },
  { title: "银河护卫队3", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/6c33d4e5f6a7b.jpg" },
  { title: "蜘蛛侠：纵横宇宙", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/6d44e5f6a7b8c.jpg" },
  { title: "阿凡达：水之道", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/6e55f6a7b8c9d.jpg" },
  { title: "黑豹2", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/6f66a7b8c9d0e.jpg" },
  { title: "奇异博士2", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/7077b8c9d0e1f.jpg" },
  { title: "雷神4：爱与雷霆", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/7188c9d0e1f2a.jpg" },
  { title: "蚁人3：量子狂潮", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/7299d0e1f2a3b.jpg" },
  { title: "银河护卫队假日特辑", status: "高清", type: "电影", img: "https://cdn.04pic.com/image/73aae1f2a3b4c.jpg" },
];

const rankingShows = [
  { title: "龙之家族第三季", status: "更新至8集" },
  { title: "幻视任务", status: "更新至7集" },
  { title: "羊毛战记第三季", status: "更新至10集" },
  { title: "古战场传奇：吾血之亲第二季", status: "更新至8集" },
  { title: "雪国列车第四季", status: "更新至10集" },
  { title: "梦魇绝镇第四季", status: "更新至10集" },
  { title: "基地第三季", status: "更新至10集" },
  { title: "时光之轮第三季", status: "更新至8集" },
  { title: "女巫团学院", status: "更新至21集" },
  { title: "绿灯军团", status: "更新至8集" },
];

const hotShows = [
  { title: "龙之家族第三季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a3994a092e43.jpg" },
  { title: "幻视任务", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6acfadddb7ca0.jpg" },
  { title: "羊毛战记第三季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a46de60f347c.jpg" },
  { title: "古战场传奇：吾血之亲第二季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6aad6be8be4b3.jpg" },
  { title: "最后生还者第二季", status: "更新至7集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/66d4b0a90e2c3.jpg" },
  { title: "怪奇物语第五季", status: "更新至8集", type: "灵异/惊悚", img: "https://cdn.04pic.com/image/67f8b81e8c5da.jpg" },
];

const categorySections = [
  { title: "魔幻/科幻", shows: scifiShows },
  { title: "灵异/惊悚", shows: thrillerShows },
  { title: "都市/情感", shows: urbanShows },
  { title: "犯罪/历史", shows: crimeShows },
  { title: "选秀/综艺", shows: varietyShows },
  { title: "动漫/卡通", shows: animeShows },
  { title: "电影", shows: movieShows },
];

export default function Home() {

  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = banners[bannerIndex];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
<>
      <main className="container mx-auto px-2 pt-3 sm:px-4 sm:pt-4">
        {/* Featured Banner */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
          <div className="relative aspect-[16/6] w-full sm:aspect-[21/6]">
            <img
              src={currentBanner.img}
              alt={currentBanner.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-8">
              <h2 className="text-xl font-bold text-white sm:text-3xl">{currentBanner.title}</h2>
              <p className="mt-2 max-w-md text-xs text-gray-200 sm:text-sm">{currentBanner.desc}</p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1 rounded bg-[#ef4444] px-3 py-1.5 text-xs text-white transition-colors hover:bg-red-600 sm:px-5 sm:py-2 sm:text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                立即观看
              </a>
            </div>
            <div className="absolute bottom-3 right-4 flex gap-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBannerIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === bannerIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`banner ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category Quick Nav */}
        <div className="mt-3 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:mt-4 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            {quickCategories.map((cat) => (
              <a
                key={cat}
                href="#"
                className="rounded bg-[#f9f9f9] px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-red-600 sm:text-sm"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 lg:grid-cols-[1fr_280px]">
          {/* Main content */}
          <div className="space-y-3 sm:space-y-4">
            {/* Latest Updates */}
            <Section title="最新更新" href="#">
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {latestUpdates.map((show) => (
                  <li
                    key={show.title}
                    className="flex items-center gap-2 py-2 text-xs sm:text-sm"
                  >
                    <a
                      href="#"
                      className="min-w-0 flex-1 truncate text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400"
                      title={show.title}
                    >
                      {show.title}
                    </a>
                    <span className="hidden flex-shrink-0 text-gray-400 dark:text-gray-500 sm:inline">
                      {show.type}
                    </span>
                    <span className="flex-shrink-0 text-[#ef4444] dark:text-red-400">{show.status}</span>
                    <span className="flex-shrink-0 text-gray-400 dark:text-gray-500">{show.date}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Category Sections */}
            {categorySections.map((section) => (
              <Section key={section.title} title={section.title} href="#">
                <ul className="grid grid-cols-3 gap-0 sm:grid-cols-4 md:grid-cols-5">
                  {section.shows.map((show) => (
                    <ShowCard key={show.title} show={show} />
                  ))}
                </ul>
              </Section>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-3 sm:space-y-4">
            <Section title="本周排行">
              <ul className="space-y-1">
                {rankingShows.map((show, i) => (
                  <li key={show.title} className="flex items-center gap-2 text-xs sm:text-sm">
                    <em
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-[10px] text-white ${
                        i < 3 ? "bg-[#ef4444] dark:bg-red-600" : "bg-gray-400 dark:bg-gray-500"
                      }`}
                    >
                      {i + 1}
                    </em>
                    <a
                      href="#"
                      className="min-w-0 flex-1 truncate text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400"
                      title={show.title}
                    >
                      {show.title}
                    </a>
                    <span className="flex-shrink-0 text-gray-400 dark:text-gray-500">{show.status}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="热门推荐">
              <ul className="grid grid-cols-3 gap-0 sm:grid-cols-3 lg:grid-cols-1">
                {hotShows.map((show) => (
                  <ShowCard key={show.title} show={show} showPlayButton={false} />
                ))}
              </ul>
            </Section>
          </aside>
        </div>
      </main>



      <button
        onClick={handleScrollTop}
        className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded bg-white text-sm text-gray-700 shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:bg-[#ef4444] hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-600 sm:bottom-[50px] sm:right-[50px] sm:h-[50px] sm:w-[50px] sm:text-lg"
        aria-label="回到顶部"
      >
        Top
      </button>
    </>
  );
}