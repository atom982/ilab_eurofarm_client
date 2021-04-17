import lazyLoading from "./lazyLoading";

export default {
  name: "obrada",
  meta: {
    expanded: false,
    title: "Obrada uzoraka", 
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-ui-elements"
  },
  children: [
    {
      name: "rt-obrada",
      path: "/rtobrada/pregled",
      component: lazyLoading("rtobrada/table"),
      meta: {
        title: "CoV2 RT PCR obrada",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "lp-obrada",
      path: "/lpobrada/pregled",
      component: lazyLoading("lpobrada/table"),
      meta: {
        title: "CoV2 RT LAMP obrada",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "ag-obrada",
      path: "/agobrada/pregled",
      component: lazyLoading("agobrada/table"),
      meta: {
        title: "CoV2 Antigen obrada",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "at-obrada",
      path: "/atobrada/pregled",
      component: lazyLoading("atobrada/table"),
      meta: {
        title: "CoV2 Antitijela obrada",
        show: false,
        requiredAuth: true
      }
    },
  ]
};
