import type { Route } from "./+types/info";
import { useMemo, useState } from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { SearchIcon } from "../../components/icons";
import { countries, type Country } from "../../data/countries";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "足球资料_篮球资料_赛事资料库-捷报比分网" },
    { name: "description", content: "捷报比分网足球与NBA资料库，涵盖足球赛程、足球联赛资料等多种足球数据以及NBA赛事信息。" },
  ];
}

const continentTabs = [
  { id: 0, label: "全部赛事" },
  { id: 1, label: "欧洲赛事" },
  { id: 2, label: "美洲赛事" },
  { id: 3, label: "亚洲赛事" },
  { id: 4, label: "大洋洲" },
  { id: 5, label: "非洲赛事" },
  { id: 6, label: "篮球赛事", href: "//nba.nowscore.com" },
];

const hotLeagues = [
  { name: "欧洲杯", href: "/cn/CupMatch/67.html" },
  { name: "英超", href: "/cn/League.aspx?SclassID=36" },
  { name: "意甲", href: "/cn/League.aspx?SclassID=34" },
  { name: "西甲", href: "/cn/League.aspx?SclassID=31" },
  { name: "德甲", href: "/cn/League.aspx?SclassID=8" },
  { name: "法甲", href: "/cn/League.aspx?SclassID=11" },
  { name: "英冠", href: "/cn/SubLeague.aspx?SclassID=37" },
  { name: "欧冠", href: "/cn/CupMatch.aspx?SclassID=103" },
  { name: "欧罗巴", href: "/cn/CupMatch.aspx?SclassID=113" },
  { name: "欧国联", href: "/cn/CupMatch/1864.html" },
  { name: "NBA", href: "//nba.nowscore.com/league/index_cn.aspx?SclassID=1" },
  { name: "CBA", href: "//nba.nowscore.com/league/index_cn.aspx?SclassID=5" },
];

function leagueTypeBadge(type: number) {
  if (type === 2) {
    return (
      <span className="ml-1 inline-block rounded bg-amber-100 px-1 text-[9px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
        杯
      </span>
    );
  }
  return null;
}

function CountryCard({ country }: { country: Country }) {
  const [expanded, setExpanded] = useState(true);
  const flagUrl = `//info.nowscore.com/${country.flag}`;
  const displayLeagues = expanded ? country.leagues : country.leagues.slice(0, 6);
  const hasMore = country.leagues.length > 6;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2 text-left hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800/60 dark:hover:bg-gray-800"
      >
        <img src={flagUrl} alt={country.name} className="h-5 w-7 rounded-sm object-cover" loading="lazy" />
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{country.name}</span>
        <span className="text-xs text-gray-400">({country.leagues.length})</span>
        <span className="ml-auto text-xs text-gray-400">{expanded ? "收起 ▲" : "展开 ▼"}</span>
      </button>
      <div className="flex flex-wrap gap-1.5 p-3">
        {displayLeagues.map((lg) => (
          <a
            key={lg.id}
            href={`//info.nowscore.com/cn/League.aspx?SclassID=${lg.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 transition-colors hover:border-[#0f9d58] hover:text-[#0f9d58] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-green-500 dark:hover:text-green-400"
          >
            {lg.name}
            {leagueTypeBadge(lg.type)}
          </a>
        ))}
        {!expanded && hasMore && (
          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-400">...</span>
        )}
      </div>
    </div>
  );
}

export default function Info({ loaderData }: Route.ComponentProps) {
  const [activeContinent, setActiveContinent] = useState(0);
  const [lang, setLang] = useState<"cn" | "tw">("cn");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = countries;
    if (activeContinent !== 0) {
      list = list.filter((c) => c.continent === activeContinent);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list
        .map((c) => ({
          ...c,
          leagues: c.leagues.filter((l) => l.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)),
        }))
        .filter((c) => c.leagues.length > 0);
    }
    return list;
  }, [activeContinent, search]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <SiteHeader />

      {/* Continent navigation tabs */}
      <nav className="bg-white shadow-sm dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-2 sm:px-4">
          {continentTabs.map((tab) =>
            tab.href ? (
              <a
                key={tab.id}
                href={tab.href}
                target="_blank"
                rel="noreferrer"
                className={`whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${
                  activeContinent === tab.id
                    ? "border-b-2 border-[#0f9d58] text-[#0f9d58]"
                    : "border-b-2 border-transparent text-gray-600 hover:text-[#0f9d58] dark:text-gray-300"
                }`}
              >
                {tab.label}
              </a>
            ) : (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveContinent(tab.id)}
                className={`whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${
                  activeContinent === tab.id
                    ? "border-b-2 border-[#0f9d58] text-[#0f9d58]"
                    : "border-b-2 border-transparent text-gray-600 hover:text-[#0f9d58] dark:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            )
          )}
        </div>
      </nav>

      {/* Sub-nav: hot leagues + lang + search */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-2 py-2 sm:px-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap gap-x-3 gap-y-1">
            {hotLeagues.map((lg) => (
              <a
                key={lg.name}
                href={`//info.nowscore.com${lg.href}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-[#0f9d58] dark:text-gray-300 dark:hover:text-green-400"
              >
                {lg.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-sm">
              <button
                type="button"
                onClick={() => setLang("cn")}
                className={`px-1.5 ${lang === "cn" ? "text-[#0f9d58] font-bold" : "text-gray-500 dark:text-gray-400"}`}
              >
                简
              </button>
              <button
                type="button"
                onClick={() => setLang("tw")}
                className={`px-1.5 ${lang === "tw" ? "text-[#0f9d58] font-bold" : "text-gray-500 dark:text-gray-400"}`}
              >
                繁
              </button>
            </div>
            <div className="flex items-center rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索球队/联赛"
                className="w-28 rounded-l-md px-2 py-1 text-xs outline-none dark:bg-gray-800 dark:text-gray-100 sm:w-36"
              />
              <button
                type="button"
                onClick={() => {}}
                className="flex items-center gap-1 rounded-r-md bg-[#0f9d58] px-2.5 py-1 text-xs text-white hover:bg-[#0a7d47]"
              >
                <SearchIcon />
                查询
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content: countries & leagues */}
      <main className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900">
            未找到匹配的赛事
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          共 {filtered.length} 个国家/地区 · {filtered.reduce((s, c) => s + c.leagues.length, 0)} 项赛事
          {loaderData ? ` · ${loaderData}` : ""}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}