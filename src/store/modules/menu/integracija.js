import lazyLoading from "./lazyLoading";

export default {
  name: "integracija",
  meta: {
    expanded: false,
    title: "Integracija",
    class: "primary",
    show: false,
    iconClass: "fa fa-puzzle-piece"
  },

  children: [
    {
      name: "integracija-pregled",
      path: "/integracija/pregled",
      component: lazyLoading("integracija/pregled/pregled"),
      meta: {
        title: "Pregled",
        requiredAuth: true
      }
    },
    {
      name: "integracija-postavke",
      path: "/integracija/postavke",
      component: lazyLoading("integracija/postavke/postavke"),
      meta: {
        title: "Postavke",
        requiredAuth: true
      }
    }
  ]
};
