import type {HomeMovie, TempCategory, TempMovieType} from "~/types";


export interface CategoryItem {
    category: TempCategory;
    movie_list: HomeMovie[];
    movie_type_list: TempMovieType[];
}

export interface CategoryPage {
    data: CategoryItem[];
}