export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "4%"
    },
    {
      name: "NAZIV",
      title: "NAZIV",
      sortField: "NAZIV",
      width: "16%"
    },
    {
      name: "ZA_KLIJENTA",
      title: "ZA_KLIJENTA",
      sortField: "ZA_KLIJENTA",
      width: "16%"
    },
    {
      name: "LN",
      title: "LN",
      sortField: "LN",
      width: "16%"
    },
    {
      name: "OPIS",
      title: "OPIS",
      sortField: "OPIS",
      width: "20%"
    },
    {
      name: "PAKOVANJE",
      title: "PAKOVANJE",
      sortField: "PAKOVANJE",
      width: "20%"
    },
    {
      name: "MJERA",
      title: "MJERA",
      width: "10%"
    },
    {
      name: "CIJENA",
      title: "CIJENA",
      width: "10%"
    },
    {
      name: "IZMJENI",
      title: "IZMJENI",
      width: "10%"
    }
  ],
  sortFunctions: {
    id: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
