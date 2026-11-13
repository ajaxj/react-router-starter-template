import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
  layout("routes/app.tsx", [
    index("routes/home.tsx"),
    route("categories", "routes/categories.tsx"),
    route("video/:id?", "routes/video.tsx"),
    route("demo", "routes/demo.tsx"),
    route("demos/demo1", "routes/demos/demo1.tsx"),
  ]),
] satisfies RouteConfig;