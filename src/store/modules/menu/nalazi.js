import lazyLoading from "./lazyLoading";

export default {
  name: "nalazi",
  meta: {
    expanded: false,
    title: "Pregled nalaza", 
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-files"
  },

  children: [
    {
      name: "nalazi-pregled",
      path: "/nalazi/pregled",
      component: lazyLoading("nalazi/pregled/pregled"),
      meta: {
        title: "PDF dokumenti",
        requiredAuth: true
      }
    },
    {
      name: "nalazi-outbox",
      path: "/nalazi/outbox",
      component: lazyLoading("nalazi/outbox/outbox"),
      meta: {
        title: "Elektronska pošta",
        requiredAuth: true
      }
    }
  ]
};
