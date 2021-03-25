import lazyLoading from "./lazyLoading";

export default {
  name: "import",
  path: "/import",
  component: lazyLoading("excel/Import"),
  meta: {
    default: false,
    title: "Import",
    class: "primary",
    show: false,
    iconClass: "glyphicon glyphicon-import",
    requiredAuth: true
  }
};
