import lazyLoading from "./lazyLoading";

export default {
  name: "pdf",
  path: "/nalazi/pregled",
  component: lazyLoading("nalazi/pregled/pregled"),
  meta: {
    default: false,
    expanded: false,
    title: "Pregled nalaza",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-files",
    requiredAuth: true
  }
};
