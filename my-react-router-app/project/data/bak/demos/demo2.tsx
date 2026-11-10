import { useState } from "react";
import type { Route } from "./+types/demo2";

import FilterRow from "~/components/filter-row";
import ShowCard from "~/components/show-card";


const categories = [
  "魔幻/科幻", "灵异/惊悚", "都市/情感", "犯罪/历史", "选秀/综艺", "动漫/卡通", "电影",
];

const genres = [
  "全部", "吸血鬼", "传记", "歌舞", "科幻", "动作", "剧情", "魔幻", "青春", "冒险",
  "悬疑", "奇幻", "暴力", "血腥", "惊悚", "动画", "喜剧", "罪案", "历史", "迷你剧",
  "爱情", "战争", "古装", "医务", "西部", "史诗", "记录", "家庭",
];

const regions = [
  "全部", "美国", "英国", "加拿大", "澳大利亚", "西班牙", "韩国", "法国", "德国",
  "巴西", "意大利", "墨西哥", "俄罗斯", "土耳其", "台湾", "其他",
];

const years = [
  "全部", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016",
  "2015", "2014", "2013", "2012", "90后", "80后", "更早",
];

const shows = [
  { title: "古战场传奇：吾血之亲第二季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6aad6be8be4b3.jpg" },
  { title: "幻视任务", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6acfadddb7ca0.jpg" },
  { title: "小先知", status: "更新至6集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/69b0276e8eba3.jpg" },
  { title: "方舟一号第三季", status: "更新至12集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a7364f465525.jpg" },
  { title: "绿灯军团", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a8345b7e7f68.jpg" },
  { title: "女巫团学院", status: "更新至21集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6ac8190983c02.jpg" },
  { title: "斯图尔特未能拯救宇宙", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a67600b2202a.jpg" },
  { title: "星际迷航：奇异新世界第四季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a67606133296.jpg" },
  { title: "图书馆员：下一章第二季", status: "更新至12集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a738d20599b7.jpg" },
  { title: "羊毛战记第三季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a46de60f347c.jpg" },
  { title: "龙之家族第三季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a3994a092e43.jpg" },
  { title: "百年孤独第二季", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a7363550ed69.jpg" },
  { title: "雪国列车第四季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/66960cbda31da.jpg" },
  { title: "雪国列车第三季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2022/02/24/p2768873523.jpg" },
  { title: "雪国列车第二季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2021/01/26/p2628614042.jpg" },
  { title: "雪国列车第一季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2020/09/28/p2580967274.jpg" },
  { title: "无垠的太空第六季", status: "更新至6集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2022/02/24/p2756605344.jpg" },
  { title: "无垠的太空第五季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2020/12/16/p2622388221.jpg" },
  { title: "无垠的太空第四季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2020/09/28/p2570610523.jpg" },
  { title: "无垠的太空第二季", status: "更新至13集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2020/09/27/p2460491416.jpg" },
  { title: "无垠的太空第一季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2020/09/28/p2276966687.jpg" },
  { title: "星城", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a195095351d0.jpg" },
  { title: "谜之屋", status: "更新至3集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a4f83e21bd97.jpg" },
  { title: "梦魇绝镇第四季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/69e6a455cdf00.jpg" },
  { title: "降世神通：最后的气宗第二季", status: "更新至7集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6a3eb26e603c8.jpg" },
  { title: "基地第三季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/6870c49f8164f.jpg" },
  { title: "基地第二季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/648fef5a64033.jpg" },
  { title: "基地第一季", status: "更新至10集", type: "魔幻/科幻", img: "https://cdn.tupianla.cc/images/meiju/2022/02/24/p2665224649.jpg" },
  { title: "时光之轮第三季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/67d2fa26e5ebf.jpg" },
  { title: "时光之轮第二季", status: "更新至8集", type: "魔幻/科幻", img: "https://cdn.04pic.com/image/64f145b6544c7.jpg" },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "最新魔幻/科幻类美剧-美剧天堂" },
    { name: "description", content: "美剧天堂提供2020最新的魔幻/科幻类美剧" },
  ];
}

export default function Demo2() {

  const [sortTab, setSortTab] = useState<"latest" | "hot">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 34;
  const totalItems = 997;

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
 <>
      <main className="container mx-auto px-2 pt-3 sm:px-4 sm:pt-4">
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:p-4">
          <FilterRow label="分类" items={categories} activeIndex={0} />
          <FilterRow label="类型" items={genres} activeIndex={0} />
          <FilterRow label="地区" items={regions} activeIndex={0} />
          <FilterRow label="年代" items={years} activeIndex={0} />
        </div>

        <div className="mt-3 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:mt-4 sm:p-4">
          <div className="flex justify-center border-b border-gray-100 pb-3 dark:border-gray-700">
            <button
              onClick={() => setSortTab("latest")}
              className={`px-2.5 text-base leading-[30px] transition-colors ${
                sortTab === "latest"
                  ? "text-[#ef4444] dark:text-red-400"
                  : "text-gray-600 hover:text-[#ef4444] dark:text-gray-300 dark:hover:text-red-400"
              }`}
            >
              最新
            </button>
            <button
              onClick={() => setSortTab("hot")}
              className={`px-2.5 text-base leading-[30px] transition-colors ${
                sortTab === "hot"
                  ? "text-[#ef4444] dark:text-red-400"
                  : "text-gray-600 hover:text-[#ef4444] dark:text-gray-300 dark:hover:text-red-400"
              }`}
            >
              热门
            </button>
          </div>

          <ul className="grid grid-cols-3 gap-0 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {shows.map((show) => (
              <ShowCard key={show.title} show={show} />
            ))}
          </ul>

          <div className="mt-4 mb-4 flex flex-wrap items-center justify-center gap-1 text-center sm:mt-5 sm:mb-5 sm:gap-0">
            <span className="hidden w-full text-xs text-gray-500 dark:text-gray-400 sm:mb-2 sm:w-auto sm:mr-2 sm:text-sm">
              共{totalItems}部 {currentPage}/{totalPages}
            </span>
            <button className="mx-0.5 rounded bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600 sm:mx-1 sm:px-3.5 sm:text-sm">
              首页
            </button>
            <button className="mx-0.5 rounded bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600 sm:mx-1 sm:px-3.5 sm:text-sm">
              上一页
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-0.5 rounded px-2.5 py-1.5 text-xs sm:mx-1 sm:px-3.5 sm:text-sm ${
                  page === currentPage
                    ? "bg-[#ef4444] text-white dark:bg-red-600"
                    : "bg-[#f9f9f9] text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="mx-0.5 rounded bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600 sm:mx-1 sm:px-3.5 sm:text-sm">
              下一页
            </button>
            <button className="mx-0.5 rounded bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600 sm:mx-1 sm:px-3.5 sm:text-sm">
              尾页
            </button>
          </div>
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