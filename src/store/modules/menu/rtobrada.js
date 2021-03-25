import lazyLoading from "./lazyLoading";

export default {
  name: "rtobrada",
  path: "/rtobrada/pregled",
  component: lazyLoading("rtobrada/table"),
  meta: {
    default: false,
    expanded: false,
    title: "CoV2 RT PCR",
    class: "primary",
    show: false,
    iconClass: "fa fa-certificate",
    requiredAuth: true
  }
};
