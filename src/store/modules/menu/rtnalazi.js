import lazyLoading from "./lazyLoading";

export default {
  name: "rtnalazi",
  path: "/rtnalazi/pregled",
  component: lazyLoading("rtnalazi/pregled/pregled"),
  meta: {
    default: false,
    expanded: false,
    title: "RT PCR Nalazi",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-files",
    requiredAuth: true
  }
};

