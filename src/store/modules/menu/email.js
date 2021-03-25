import lazyLoading from "./lazyLoading";

export default {
  name: "email",
  path: "/nalazi/outbox",
  component: lazyLoading("nalazi/outbox/outbox"),
  meta: {
    default: false,
    expanded: false,
    title: "Elektronska pošta",
    class: "primary",
    show: false,
    iconClass: "fa fa-envelope",
    requiredAuth: true
  }
};

