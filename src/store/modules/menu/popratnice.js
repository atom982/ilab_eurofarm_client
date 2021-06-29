import lazyLoading from "./lazyLoading";

export default {
  name: "popratnice",
  path: "/popratnice",
  component: lazyLoading("popratnice/popratnice"),
  meta: {
    default: false,
    title: "Popratni list",
    class: "primary",
    show: false,
    iconClass: "fa fa-hospital-o",
    requiredAuth: true
  }
};
