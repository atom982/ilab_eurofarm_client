import lazyLoading from "./lazyLoading";

export default {
  name: "mikrobiologija",
  path: "/mikrobiologija",
  component: lazyLoading("mikrobiologija/Mikrobiologija"),
  meta: {
    default: false,
    title: "Mikrobiologija",
    class: "primary",
    show: false,
    iconClass: "fa fa-bug",
    requiredAuth: true
  }
};
