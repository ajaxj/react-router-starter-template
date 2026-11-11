export interface TopNavItem {
  label: string;
  to?: string;
  end?: boolean;
  href?: string;
  badge?: string;
}

export const topNavItems: TopNavItem[] = [
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