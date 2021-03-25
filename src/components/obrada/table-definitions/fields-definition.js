export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "2.5%",
    },
    {
      name: "obrada",
      title: "protokol",
      sortField: "protokol",
      width: "15%",
    },
    {
      name: "lokacija",
      title: "partner",
      sortField: "lokacija",
      width: "15%",
    },
    {
      name: "barcode",
      title: "analiza",
      sortField: "barcode",
      width: "10%",
    },
    {
      name: "ime",
      title: "ime",
      sortField: "ime",
      width: "12%",
    },
    {
      name: "prezime",
      title: "prezime",
      sortField: "ime",
      width: "17%",
    },
    {
      name: "godište",
      title: "godište",
      width: "9%",
    },

    {
      name: "datum",
      title: "datum",
      width: "10%",
    },
    {
      name: "time",
      title: "vrijeme",
      width: "7%",
    },
    {
      name: "biljeskaIcon",
      title: "",
      width: "2.5%",
    },
  ],
  sortFunctions: {
    ime: function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    prezime: function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    pacijent: function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
  },
};
