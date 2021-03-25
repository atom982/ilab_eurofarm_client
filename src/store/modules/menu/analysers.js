import lazyLoading from "./lazyLoading";

export default {
  name: "analysers",
  path: "/analysers",
  component: lazyLoading("analysers/Analysers"),
  meta: {
    default: false,
    title: "Analizatori",
    class: "primary",
    show: false,
    iconClass: "glyphicon glyphicon-object-align-bottom",
    requiredAuth: true
  }
};
