import lazyLoading from "./lazyLoading";

export default {
  name: "inventar",
  meta: {
    expanded: false,
    title: "Inventar",
    class: "primary",
    show: false,
    iconClass: "fa fa-italic"
  },

  children: [
    {
      name: "inventar-stanje",
      path: "/inventar/stanje",
      component: lazyLoading("inventar/stanje/stanje"),
      meta: {
        title: "Stanje",
        requiredAuth: true
      }
    },
    {
      name: "inventar-ulaz",
      path: "/inventar/ulaz",
      component: lazyLoading("inventar/ulaz/main"),
      meta: {
        title: "Ulaz",
        requiredAuth: true
      }
    },
    {
      name: "inventar-izlaz",
      path: "/inventar/izlaz",
      component: lazyLoading("inventar/izlaz/main"),
      meta: {
        title: "Izlaz",
        requiredAuth: true
      }
    },
    {
      name: "inventar-ugovori",
      path: "/inventar/ugovori",
      component: lazyLoading("inventar/ugovori/ugovor"),
      meta: {
        title: "Ugovori",
        requiredAuth: true
      }
    },
    {
      name: "inventar-produkti",
      path: "/inventar/produkti",
      component: lazyLoading("inventar/produkti/pregled"),
      meta: {
        title: "Produkti",
        requiredAuth: true
      }
    },
    {
      name: "inventar-postavke",
      path: "/inventar/postavke",
      component: lazyLoading("inventar/postavke/postavke"),
      meta: {
        title: "Postavke",
        requiredAuth: true
      },  
    },

  ]
};
