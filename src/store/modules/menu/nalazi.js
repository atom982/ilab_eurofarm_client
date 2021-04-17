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
      name: "rt-nalazi-pregled",
      path: "/rtnalazi/pregled",
      component: lazyLoading("rtnalazi/pregled/pregled"),
      meta: {
        title: "CoV2 RT PCR nalazi",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "lp-nalazi-pregled",
      path: "/lpnalazi/pregled",
      component: lazyLoading("lpnalazi/pregled/pregled"),
      meta: {
        title: "CoV2 RT LAMP nalazi",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "ag-nalazi-pregled",
      path: "/agnalazi/pregled",
      component: lazyLoading("agnalazi/pregled/pregled"),
      meta: {
        title: "CoV2 Antigen nalazi",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "at-nalazi-pregled",
      path: "/atnalazi/pregled",
      component: lazyLoading("atnalazi/pregled/pregled"),
      meta: {
        title: "CoV2 Antitijela nalazi",
        show: false,
        requiredAuth: true
      }
    },
  ]
};
