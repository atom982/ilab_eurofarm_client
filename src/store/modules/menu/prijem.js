import lazyLoading from "./lazyLoading";

export default {
  name: "prijem",
  path: "/prijem",
  component: lazyLoading("02_prijem/PregledPacijenta"),
  meta: {
    default: false,
    title: "Prijem pacijenta",
    class: "primary",
    show: false,
    iconClass: "fa fa-user",
    requiredAuth: true
  }
};
