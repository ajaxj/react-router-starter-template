import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/demo", "routes/demo.tsx"),
    route("/demos/demo1", "routes/demos/demo1.tsx"),

] satisfies RouteConfig;
