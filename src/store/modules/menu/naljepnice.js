import lazyLoading from "./lazyLoading";

export default {
  name: "naljepnice",
  path: "/naljepnice",
  component: lazyLoading("naljepnice/naljepnice"),
  meta: {
    default: false,
    title: "Statusi uzoraka",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-time",
    requiredAuth: true
  }
};
