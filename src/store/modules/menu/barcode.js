import lazyLoading from "./lazyLoading";

export default {
  name: "barcode",
  path: "/barcode",
  component: lazyLoading("barcode/barcode"),
  meta: {
    default: false,
    title: "Prijem uzorka",
    class: "primary",
    show: false,
    iconClass: "fa fa-flask",
    requiredAuth: true
  }
};
