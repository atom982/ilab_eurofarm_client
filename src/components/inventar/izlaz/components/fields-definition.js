export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "4%"
    },
    {
      name: "KLIJENT",
      title: "KLIJENT",
      sortField: "KLIJENT",
      width: "16%"
    },
    {
      name: "RACUN",
      title: "RACUN",
      sortField: "RACUN",
      width: "16%"
    },
    {
      name: "PRODUKT",
      title: "PRODUKT",
      sortField: "PRODUKT",
      width: "16%"
    },
    {
      name: "KOLICINA",
      title: "KOLICINA",
      sortField: "KOLICINA",
      width: "20%"
    },
    {
      name: "CIJENA",
      title: "CIJENA",
      sortField: "CIJENA",
      width: "20%"
    },
    {
      name: "DATUM",
      title: "DATUM",
      sortField: "DATUM",
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
