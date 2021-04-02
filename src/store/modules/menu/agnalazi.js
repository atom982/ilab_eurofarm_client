import lazyLoading from "./lazyLoading";

export default {
  name: "agnalazi",
  path: "/agnalazi/pregled",
  component: lazyLoading("agnalazi/pregled/pregled"),
  meta: {
    default: false,
    expanded: false,
    title: "Antigen Nalazi",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-files",
    requiredAuth: true
  }
};

