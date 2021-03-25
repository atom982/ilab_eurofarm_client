import lazyLoading from "./lazyLoading";

export default {
  name: "narucioci",
  path: "/narucioci",
  component: lazyLoading("narucioci/narucioci"),
  meta: {
    default: false,
    title: "Group email",
    class: "primary",
    show: false,
    iconClass: "glyphicon glyphicon-envelope",
    requiredAuth: true
  }
};
