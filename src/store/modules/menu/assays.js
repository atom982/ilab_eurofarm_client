import lazyLoading from "./lazyLoading";

export default {
  name: "assays",
  path: "/assays",
  component: lazyLoading("assays/Assays"),
  meta: {
    default: false,
    title: "Assays",
    class: "primary",
    show: false,
    iconClass: "fa fa-font",
    requiredAuth: true
  }
};
