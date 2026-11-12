import { useState } from "react";
import type { Route } from "./+types/movie-detail";

import ShowCard from "~/components/show-card";
import {API_ENDPOINTS} from "~/lib/api";
import type {CategoryItem, TempMovie} from "~/types";


const showInfo = {
    title: "幻视任务",
    year: 2026,
    poster: "https://cdn.04pic.com/image/6acfadddb7ca0.jpg",
    originalName: "VisionQuest",
    alias: "幻视征途(港)/旺达幻视衍生剧/幻视追寻/幻视探索/Vision Quest",
    status: "共8集 | 更新至第7集",
    actors: "保罗·贝坦尼,詹姆斯·斯派德,詹姆斯·达西,鲁阿里德·莫利卡",
    directors: "特里·马塔拉斯,克里斯托弗·J·伯恩,文森",
    premiere: "2026-10-13(美国)",
    updateCycle: "周三更新",
    subCategory: ["科幻", "动作", "剧情"],
    subGroup: "星帆影视压制双语",
    tvStation: "Disney+",
    permanentDomain: "mjtt.io(收藏防迷路)",
    updatedAt: "2026-11-05 02:56:57",
    intro:
        "《幻视任务》承接《旺达幻视》的故事。重获记忆却失去情感的白幻视离开西景镇，踏上寻找自我与人性的旅程。他试图理解曾经与旺达建立的家庭，并追查少年托马斯·谢泼德是否就是自己的儿子汤米。然而，一股危险势力盯上他的身体与先进技术，雇佣兵圣骑士的追捕让探索变成生存考验。与此同时，奥创与多个人工智能角色的出现，迫使幻视重新审视创造者、记忆和自由意志之间的关系。他必须决定：拥有过去的记忆，是否就意味着仍是原来的自己？",
};

const episodes = [
    { n: 7, href: "#" },
    { n: 6, href: "#" },
    { n: 5, href: "#" },
    { n: 4, href: "#" },
    { n: 3, href: "#" },
    { n: 2, href: "#" },
    { n: 1, href: "#" },
];

const magnetLinks = [
    { name: "幻视任务.幻视任务.VisionQuest.S01E07.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:537b639cff7c152026803ca446081c9bf2e37acc" },
    { name: "幻视任务.幻视任务.VisionQuest.S01E06.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:9cb129931004e90472724339b8c9e6f6cba1e0c6" },
    { name: "幻视任务.幻视任务.VisionQuest.S01E05.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:5a37e52a6b7c658bd52cb1c260dc00406609d2a8" },
    { name: "幻视任务.幻视任务.VisionQuest.S01E04.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:fa34fe59a835c71636baddd90089a45367efc969" },
    { name: "幻视任务.幻视任务.VisionQuest.S01E03.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:3a50f91718a051ff584004046603babb0c819d70" },
    { name: "幻视任务.幻视任务.VisionQuest.S01E02.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:289ac7638f5e20be56932a95ee42a814994fc4be" },
    { name: "幻视任务.幻视任务.VisionQuest.S01E01.1080p.CHS&ENG.www.xingfan.cc.mp4", magnet: "magnet:?xt=urn:btih:9e5ce82aff54b298b53c6cc2948a0876966234c9" },
];

const cloudLinks = {
    pan: { name: "幻视任务.第01-07集", href: "https://pan.baidu.com/s/11cQY09sPlrCI15Hm5OZssA?pwd=1234", pwd: "1234" },
    quark: { name: "幻视任务.第01-07集", href: "https://pan.quark.cn/s/aa14b78250d3" },
};

const relatedShows = [
    { title: "港湾第一季", status: "更新至13集", img: "https://cdn.tupianla.cc/images/meiju/2020/09/27/852.jpg" },
    { title: "罗斯威尔第四季", status: "更新至13集", img: "https://cdn.04pic.com/image/629eb1297de78.jpg" },
    { title: "绿箭侠第七季", status: "更新至22集", img: "https://cdn.tupianla.cc/images/meiju/2020/09/28/p2532579748.jpg" },
    { title: "超越时间线第三季", status: "更新至13集", img: "https://cdn.tupianla.cc/images/meiju/2020/09/27/19565.jpg" },
    { title: "圣域第一季", status: "更新至8集", img: "https://cdn.tupianla.cc/images/meiju/2020/09/27/201463014261997838.jpg" },
    { title: "隐世狼女第三季", status: "更新至10集", img: "https://cdn.tupianla.cc/images/meiju/2020/09/27/p2321434891.jpg" },
];

const rankingShows = [
    { title: "末日骑士第一季", status: "更新至6集", img: "https://cdn.04pic.com/image/64366d905095b.jpg" },
    { title: "终极名单第一季", status: "更新至8集", img: "https://cdn.04pic.com/image/628b5c29dc13b.jpg" },
    { title: "龙之家族第三季", status: "更新至8集", img: "https://cdn.04pic.com/image/6a3994a092e43.jpg" },
    { title: "古战场传奇：吾血之亲第二季", status: "更新至8集", img: "https://cdn.04pic.com/image/6aad6be8be4b3.jpg" },
    { title: "雪国列车第四季", status: "更新至10集", img: "https://cdn.04pic.com/image/66960cbda31da.jpg" },
    { title: "权力的游戏第一季", status: "更新至10集", img: "https://cdn.tupianla.cc/images/meiju/2020/09/27/2013962185334025.jpg" },
];

const recentUpdates = [
    { title: "古战场传奇：吾血之亲第二季", status: "更新至8集" },
    { title: "小先知", status: "更新至6集" },
    { title: "方舟一号第三季", status: "更新至12集" },
    { title: "绿灯军团", status: "更新至8集" },
    { title: "女巫团学院", status: "更新至21集" },
    { title: "斯图尔特未能拯救宇宙", status: "更新至10集" },
    { title: "星际迷航：奇异新世界第四季", status: "更新至10集" },
    { title: "图书馆员：下一章第二季", status: "更新至12集" },
];

export async function loader({ params }: Route.LoaderArgs) {

    const res = await fetch(`${API_ENDPOINTS.MOVIE_DETAIL}/${params.id}`);
    const json: TempMovie = await res.json();



    //延时3秒
    // await new Promise(resolve => setTimeout(resolve, 3000));
    return json
}


export function meta({}: Route.MetaArgs) {
    return [
        { title: "Disney+《幻视任务》迅雷下载/在线观看/百度云-魔幻/科幻-美剧天堂" },
        { name: "description", content: "《幻视任务》是由Disney+电视台播出的美剧,美剧天堂提供幻视任务迅雷下载或在线观看。" },
    ];
}

function Panel({ title, children, extra }: { title: string; children: React.ReactNode; extra?: React.ReactNode }) {
    return (
        <div className="mt-3 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:mt-4 sm:p-4">
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 sm:text-lg">{title}</h2>
                {extra}
            </div>
            {children}
        </div>
    );
}

function InfoRow({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
    return (
        <li className="py-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
            <span className="mr-1 text-gray-400 dark:text-gray-500">{label}：</span>
            <span className={highlight ? "text-[#ef4444] dark:text-red-400" : ""}>{value}</span>
        </li>
    );
}

function EpisodeList({ episodes, label }: { episodes: { n: number; href: string }[]; label: string }) {
    return (
        <Panel
            title={label}
            extra={
                <a href="#" className="text-xs text-gray-500 hover:text-[#ef4444] dark:text-gray-400 dark:hover:text-red-400">
                    报错
                </a>
            }
        >
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
                {episodes.map((ep) => (
                    <li key={ep.n}>
                        <a
                            href={ep.href}
                            className="block rounded border border-gray-200 bg-gray-50 px-2 py-2 text-center text-xs text-gray-700 transition-colors hover:border-[#ef4444] hover:bg-[#fdf2f2] hover:text-[#ef4444] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-red-400 dark:hover:bg-red-900/40 dark:hover:text-red-400 sm:text-sm"
                        >
                            第{ep.n < 10 ? `0${ep.n}` : ep.n}集
                        </a>
                    </li>
                ))}
            </ul>
        </Panel>
    );
}

export default function MovieDetail({loaderData,
                                    }: Route.ComponentProps) {

    const data = loaderData


    const [downloadTab, setDownloadTab] = useState<"magnet" | "pan" | "quark">("magnet");
    const [copied, setCopied] = useState<string | null>(null);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard?.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <>

            <div className="container mx-auto px-2 pt-3 text-xs text-gray-500 dark:text-gray-400 sm:px-4 sm:pt-4 sm:text-sm">
                <a href="#" className="hover:text-[#ef4444] dark:hover:text-red-400">首页</a>
                <span className="mx-1">›</span>
                <a href="#" className="hover:text-[#ef4444] dark:hover:text-red-400">魔幻/科幻</a>
                <span className="mx-1">›</span>
                <span className="text-gray-700 dark:text-gray-200">{showInfo.title}</span>
            </div>

            <main className="container mx-auto px-2 pt-3 sm:px-4 sm:pt-4">
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:p-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="mx-auto w-full max-w-[160px] flex-shrink-0 sm:mx-0 sm:w-[25%]">
                            <img
                                src={showInfo.poster}
                                alt={showInfo.title}
                                className="aspect-[5/7] w-full rounded-lg object-cover shadow"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-100 sm:text-2xl">
                                {data.title}
                                <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">({showInfo.year})</span>
                            </h1>
                            <ul className="space-y-0.5">
                                <InfoRow label="原名" value={data.original_name} />
                                <InfoRow label="别名" value={data.alias_name} />
                                <InfoRow label="状态" value={data.status} highlight />
                                <InfoRow label="主演" value={data.actors} />
                                <InfoRow label="导演" value={data.director} />
                                <InfoRow label="首播日期" value={data.finished} />
                                <InfoRow label="更新周期" value={showInfo.updateCycle} />
                                <InfoRow
                                    label="小分类"
                                    value={
                                        <span className="space-x-2">
                      {showInfo.subCategory.map((c) => (
                          <a key={c} href="#" className="text-[#ef4444] hover:underline dark:text-red-400">
                              {c}
                          </a>
                      ))}
                    </span>
                                    }
                                />
                                <InfoRow label="字幕组" value={data.subtitle_group} />
                                <InfoRow label="电视台" value={data.tv_station} />
                                <InfoRow label="更新" value={data.updated} />
                            </ul>
                        </div>
                    </div>
                </div>

                <EpisodeList label="云播" episodes={episodes} />
                <EpisodeList label="云播二" episodes={episodes} />

                <div className="mt-3 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800 sm:mt-4 sm:p-4">
                    <div className="mb-3 flex flex-wrap gap-1 border-b border-gray-100 pb-2 dark:border-gray-700">
                        {([
                            { key: "magnet", label: "中字1080P磁力" },
                            { key: "pan", label: "网盘下载" },
                            { key: "quark", label: "夸克云" },
                        ] as const).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setDownloadTab(tab.key)}
                                className={`rounded-t px-3 py-1.5 text-xs transition-colors sm:text-sm ${
                                    downloadTab === tab.key
                                        ? "bg-[#ef4444] text-white dark:bg-red-600"
                                        : "bg-[#f9f9f9] text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {downloadTab === "magnet" && (
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                            {magnetLinks.map((link, i) => (
                                <li key={i} className="flex items-center gap-2 py-2">
                                    <a
                                        href={link.magnet}
                                        className="min-w-0 flex-1 truncate text-xs text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400 sm:text-sm"
                                        title={link.name}
                                    >
                                        {link.name}
                                    </a>
                                    <button
                                        onClick={() => copyToClipboard(link.magnet, `m-${i}`)}
                                        className="flex-shrink-0 rounded bg-[#f9f9f9] px-2 py-1 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600"
                                    >
                                        {copied === `m-${i}` ? "已复制" : "复制"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {downloadTab === "pan" && (
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                            <li className="flex items-center gap-2 py-2">
                                <a
                                    href={cloudLinks.pan.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="min-w-0 flex-1 truncate text-xs text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400 sm:text-sm"
                                >
                                    {cloudLinks.pan.name}
                                    <span className="ml-2 text-red-500 dark:text-red-400">点击后自动复制密码</span>
                                </a>
                                <button
                                    onClick={() => copyToClipboard(cloudLinks.pan.pwd, "pan-pwd")}
                                    className="flex-shrink-0 rounded bg-[#f9f9f9] px-2 py-1 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600"
                                >
                                    {copied === "pan-pwd" ? "已复制" : "复制密码"}
                                </button>
                            </li>
                        </ul>
                    )}

                    {downloadTab === "quark" && (
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                            <li className="flex items-center gap-2 py-2">
                                <a
                                    href={cloudLinks.quark.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="min-w-0 flex-1 truncate text-xs text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400 sm:text-sm"
                                >
                                    {cloudLinks.quark.name}
                                </a>
                                <button
                                    onClick={() => copyToClipboard(cloudLinks.quark.href, "quark")}
                                    className="flex-shrink-0 rounded bg-[#f9f9f9] px-2 py-1 text-xs text-gray-600 hover:bg-[#ef4444] hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-600"
                                >
                                    {copied === "quark" ? "已复制" : "复制"}
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                <Panel title={`${showInfo.title}的剧情简介 · · · · · ·`}>
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm sm:leading-7">{showInfo.intro}</p>
                </Panel>

                <Panel title="可能喜欢">
                    <ul className="grid grid-cols-3 gap-0 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {relatedShows.map((s) => (
                            <ShowCard key={s.title} show={{ ...s, type: "魔幻/科幻" }} showPlayButton={false} />
                        ))}
                    </ul>
                </Panel>

                <Panel title="魔幻/科幻排行榜">
                    <ul className="grid grid-cols-3 gap-0 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {rankingShows.map((s) => (
                            <ShowCard key={s.title} show={{ ...s, type: "魔幻/科幻" }} showPlayButton={false} />
                        ))}
                    </ul>
                </Panel>

                <Panel title="最近更新的魔幻/科幻">
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {recentUpdates.map((s, i) => (
                            <li key={s.title} className="flex items-center gap-2 text-xs sm:text-sm">
                                <em className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-[10px] text-white ${
                                    i < 3 ? "bg-[#ef4444] dark:bg-red-600" : "bg-gray-400 dark:bg-gray-500"
                                }`}>
                                    {i + 1}
                                </em>
                                <a href="#" className="min-w-0 flex-1 truncate text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400" title={s.title}>
                                    {s.title}
                                </a>
                                <span className="flex-shrink-0 text-gray-400 dark:text-gray-500">{s.status}</span>
                            </li>
                        ))}
                    </ul>
                </Panel>
            </main>



            <button
                onClick={handleScrollTop}
                className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded bg-white text-xs text-gray-700 shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:bg-[#ef4444] hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-red-600 sm:bottom-[50px] sm:right-[50px] sm:h-[50px] sm:w-[50px] sm:text-lg"
                aria-label="回到顶部"
            >
                Top
            </button>
        </>
    );
}