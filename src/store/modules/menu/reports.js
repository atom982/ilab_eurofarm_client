import lazyLoading from "./lazyLoading";

export default {
  name: "reports",
  path: "/reports",
  component: lazyLoading("reports/Reports"),
  meta: {
    default: false,
    title: "Izvještaji",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-statistics",
    requiredAuth: true
  }
};
