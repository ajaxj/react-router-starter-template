import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/info", "routes/info/info.tsx"),
    route("/demo", "routes/demo.tsx"),
    route("/demos/demo1", "routes/demos/demo1.tsx"),

] satisfies RouteConfig;
