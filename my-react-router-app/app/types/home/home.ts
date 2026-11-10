import type { TempCategory } from "~/types";

export interface HomeMovie {
  id: number;
  title: string;
  en: string;
  img: string;
  fetch_url: string;
  actors: string;
  director: string;
  writer: string;
  subtitle_group: string;
  tv_station: string;
  original_name: string;
  alias_name: string;
  info: string;
  content: string;
  years: string;
  src: number;
  status: string;
  level: number;
  hd: string;
  view: number;
  tv: number;
  finished: string;
  created: string;
  updated: string;
  type_id: number;
  category_id: number;
}

export interface HomeCategoryItem {
  category: TempCategory;
  movie_list: HomeMovie[];
}

export interface HomePage {
  data: HomeCategoryItem[];
}