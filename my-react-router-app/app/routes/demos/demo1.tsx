// import {Route} from "react-router";
// import type { Route } from "../+types/home";
import {API_ENDPOINTS} from "~/lib/api";
import type {TempCategoryPage} from "~/types";
import type { Route } from "./+types/demo1";
import { Link } from "react-router";



export async function loader({ params }: Route.LoaderArgs) {
    const res = await fetch(`${API_ENDPOINTS.TEMP_CATEGORIES}`);
    const json: TempCategoryPage = await res.json();

    // Validate response structure
    if (!json.data) {
        console.error('Invalid API response:', json);
        return { data: [], total: 0, page: 0, size: 0 };
    }
    //延时3秒
    await new Promise(resolve => setTimeout(resolve, 3000));
    return json as TempCategoryPage;
}





export function meta({}: Route.MetaArgs) {
    return [
        { title: "ｄｅｍｏ１　New React Router App" },
        { name: "description", content: "ｄｅｍｏ１　Welcome to React Router!" },
    ];
}

// export async function clientLoader({
//                                        params,
//                                    }: Route.ClientLoaderArgs) {
//
//     const res = await fetch(`${API_ENDPOINTS.TEMP_CATEGORIES}`);
//     const json: TempCategoryPage = await res.json();
//
//     // Validate response structure
//     if (!json.data) {
//         console.error('Invalid API response:', json);
//         return { data: [], total: 0, page: 0, size: 0 };
//     }
//     //延时3秒
//     await new Promise(resolve => setTimeout(resolve, 3000));
//     return json as TempCategoryPage;
// }
//
// // HydrateFallback is rendered while the client loader is running
// export function HydrateFallback() {
//     return <div>Loading...</div>;
// }


export default function Demo1({loaderData,
}: Route.ComponentProps) {

    const { data } = loaderData;
    return (
        <>
        <div>Demo 1:{data.length}</div>
            {data.map((item) => (
                <div key={item.id}>'
                    <Link to={`/demos/demo2/${item.id}`}>{item.name}</Link>
                </div>
            ))}

        </>
    );
}