import lazyLoading from "./lazyLoading";

export default {
  name: "analize",
  path: "/postavke/analize",
  component: lazyLoading("analize/Analize"),
  meta: {
    default: false,
    expanded: false,
    title: "Postavke analiza",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-settings",
    requiredAuth: true
  }
};
