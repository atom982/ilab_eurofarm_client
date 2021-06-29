import lazyLoading from "./lazyLoading";

export default {
  name: "transport",
  path: "/transport",
  component: lazyLoading("transport/transport"),
  meta: {
    default: false,
    title: "Transportni list",
    class: "primary",
    show: false,
    iconClass: "fa fa-ambulance",
    requiredAuth: true
  }
};
