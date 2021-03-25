export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "4%"
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
      name: "PROIZVODJAC",
      title: "PROIZVODJAC",
      width: "20%"
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
