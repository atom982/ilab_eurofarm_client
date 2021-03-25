import lazyLoading from "./lazyLoading";

export default {
  name: "loger",
  meta: {
    expanded: false,
    title: "Temperatura",
    class: "primary",
    show: false,
    iconClass: "fa fa-thermometer"
  },

  children: [
    {
      name: "loger-pregled",
      path: "/loger/pregled",
      component: lazyLoading("loger/pregled/pregled"),
      meta: {
        title: "Pregled",
        requiredAuth: true
      }
    },
    {
      name: "loger-postavke",
      path: "/loger/postavke",
      component: lazyLoading("loger/postavke/postavke"),
      meta: {
        title: "Postavke",
        requiredAuth: true
      }
    }
  ]
};
