import lazyLoading from "./lazyLoading";

export default {
  name: "agobrada",
  path: "/agobrada/pregled",
  component: lazyLoading("agobrada/table"),
  meta: {
    default: false,
    expanded: false,
    title: "CoV2 Antigen",
    class: "primary",
    show: false,
    iconClass: "fa fa-bug",
    requiredAuth: true
  }
};
