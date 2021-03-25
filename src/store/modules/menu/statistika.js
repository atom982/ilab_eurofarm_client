import lazyLoading from "./lazyLoading";

export default {
  name: "statistika",
  path: "/statistika",
  component: lazyLoading("statistika/Dashboard"),
  meta: {
    default: true,
    title: "Statistika",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-dashboard",
    requiredAuth: true
  }
};
