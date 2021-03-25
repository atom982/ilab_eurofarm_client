import lazyLoading from "./lazyLoading";

export default {
  name: "protokol",
  path: "/protokol",
  component: lazyLoading("protokol/protokol"),
  meta: {
    default: false,
    title: "Provjera nalaza",
    class: "primary",
    show: false,
    iconClass: "fa fa-check-square-o",
    requiredAuth: true
  }
};
