import lazyLoading from "./lazyLoading";

export default {
  name: "email",
  meta: {
    expanded: false,
    title: "Elektronska pošta", 
    class: "primary",
    show: false,
    iconClass: "glyphicon glyphicon-envelope"
  },
  children: [
    {
      name: "rt-email",
      path: "/nalazi/outbox/rt",
      component: lazyLoading("rtoutbox/outbox"),
      meta: {
        title: "CoV2 RT PCR pošta",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "lp-email",
      path: "/nalazi/outbox/lp",
      component: lazyLoading("lpoutbox/outbox"),
      meta: {
        title: "CoV2 RT LAMP pošta",
        show: false,
        requiredAuth: true
      }
    },
    {
      name: "ag-email",
      path: "/nalazi/outbox/ag",
      component: lazyLoading("agoutbox/outbox"),
      meta: {
        title: "CoV2 Antigen pošta",
        show: false,
        requiredAuth: true
      }
    },
  ]
};

