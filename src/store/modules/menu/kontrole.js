import lazyLoading from "./lazyLoading";

export default {
  name: "kontrole",
  meta: {
    expanded: false,
    title: "Kontrole",
    class: "primary",
    show: false,
    iconClass: "fa fa-check-square-o"
  },

  children: [
    {
      name: "kontrole-unos",
      path: "/kontrole/unos",
      component: lazyLoading("kontrole/unos/main"),
      meta: {
        title: "Unos",
        requiredAuth: true
      }
    },
    {
      name: "kontrole-pregled",
      path: "/kontrole/obrada/pregled",
      component: lazyLoading("kontrole/pregled/table"),
      meta: {
        title: "Obrada",
        requiredAuth: true
      }
    },
    {
      name: "kontrole-charts",
      path: "/kontrole/charts",
      component: lazyLoading("kontrole/charts/main"),
      meta: {
        title: "Charts",
        requiredAuth: true
      }
    },
    {
      name: "kontrole-definicija",
      path: "/kontrole/definicija",
      component: lazyLoading("kontrole/definicija/main"),
      meta: {
        title: "Definicija",
        requiredAuth: true
      }
    }
  ]
};
