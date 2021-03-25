import lazyLoading from "./lazyLoading";

export default {
  name: "postavke",
  path: "/postavke",
  component: lazyLoading("postavke/Postavke"),
  meta: {
    default: false,
    title: "Postavke",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-settings",
    requiredAuth: true
  }
};
