import type {TempMovie} from "~/types";

export interface HomeItem {
    today_movies: TempMovie[];
    weekly_movies?: TempMovie[];
    month_movies: TempMovie[];
}

export interface HomePage {
    data: HomeItem;
}