import lazyLoading from "./lazyLoading";

export default {
  name: "certificates",
  path: "/certificates/pregled",
  component: lazyLoading("certificates/CertificatesPregled"),
  meta: {
    default: false,
    expanded: false,
    title: "Izdavanje potvrda",
    class: "primary",
    show: false,
    iconClass: "fa fa-certificate",
    requiredAuth: true
  }
};
