import type {Route} from "./+types/category-list";
import {API_ENDPOINTS} from "~/lib/api";
import type {CategoryItem} from "~/types";
import {useState} from "react";
import FilterRow from "~/components/filter-row";
import ShowCard1 from "~/components/show-card1";
import FilterRow1 from "~/components/filter-row1";



export async function loader({ params }: Route.LoaderArgs) {

    const res = await fetch(`${API_ENDPOINTS.HOME_BY_CATEGORY_MOVIE_LIST_}/${params.name}`);
    const json: CategoryItem = await res.json();



    //延时3秒
    // await new Promise(resolve => setTimeout(resolve, 3000));
    return json
}


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


export default function CategoryList({loaderData,
                                         actionData,
                                         params,
                                         matches,
                                     }: Route.ComponentProps) {
    const data = loaderData;

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
                    {/*<FilterRow label="类型" items={genres} activeIndex={0} />*/}
                    <FilterRow1 label="类型" items={data.movie_type_list} activeIndex={0} />
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
                        {data.movie_list.map((show: import("~/types/home/home").HomeMovie) => (
                            <ShowCard1 key={show.title} show={show} />
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