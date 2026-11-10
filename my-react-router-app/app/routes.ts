import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/category/:name", "routes/category-list.tsx"),
    route("/movie/:id", "routes/movie-detail.tsx"),
    route("/demo", "routes/demo.tsx"),
    route("/demos/demo1", "routes/demos/demo1.tsx"),
    route("/demos/demo2", "routes/demos/demo2.tsx"),
    route("/demos/demo3", "routes/demos/demo3.tsx"),


] satisfies RouteConfig;
