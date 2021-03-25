export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "2.5%",
    },
{
      name: "rtobrada",
      title: "protokol",
      sortField: "protokol",
      width: "17%",
    },
    {
      name: "barcode",
      title: "barcode",
      sortField: "barcode",
      width: "11%",
    },
    {
      name: "svrha",
      title: "svrha",
      width: "12%",
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
