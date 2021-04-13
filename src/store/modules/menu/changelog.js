import lazyLoading from "./lazyLoading";

export default {
  name: "changelog",
  path: "/changelog",
  component: lazyLoading("changelog/changelog"),
  meta: {
    default: false,
    title: "Change Log",
    class: "primary",
    show: false,
    iconClass: "glyphicon glyphicon-erase",
    requiredAuth: true
  }
};
