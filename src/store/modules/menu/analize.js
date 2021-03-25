import lazyLoading from "./lazyLoading";

export default {
  name: "analize",
  path: "/postavke/analize",
  component: lazyLoading("analize/Analize"),
  meta: {
    default: false,
    expanded: false,
    title: "Analize",
    class: "primary",
    show: false,
    iconClass: "fa fa-flask",
    requiredAuth: true
  }
};
