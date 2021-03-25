import lazyLoading from "./lazyLoading";

export default {
  name: "partneri",
  path: "/partneri",
  component: lazyLoading("partneri/partneri"),
  meta: {
    default: false,
    expanded: false,
    title: "Partneri",
    class: "primary",
    show: false,
    iconClass: "fa fa-handshake-o",
    requiredAuth: true
  }
};

