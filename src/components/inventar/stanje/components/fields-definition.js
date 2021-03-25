export default {
  tableFields: [
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
      name: "KOLICINA",
      title: "KOLICINA",
      width: "10%"
    },
    {
      name: "iconk",
      title: "",
      width: "4%"
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
      name: "PAKOVANJE",
      title: "PAKOVANJE",
      width: "20%"
    },
    {
      name: "EXP",
      title: "EXP",
      sortField: "EXP",
      width: "20%"
    },
    {
      name: "icon",
      title: "",
      width: "4%"
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
