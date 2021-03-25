export default {
  tableFields: [
    {
      name: "kontrole",
      title: "detalji",
      width: "14%",
    },
    {
      name: "tip",
      title: "tip",
      width: "8%",
    },
    {
      name: "naziv",
      sortField: "naziv",
      width: "17%",
    },
    {
      name: "proizvođač",
      sortField: "proizvođač",
      width: "14%",
    },
    {
      name: "lot",
      sortField: "lot",
      width: "11%",
    },
    {
      name: "barcode",
      title: "barcode",
      width: "17%",
    },
    {
      name: "datum",
      title: "datum",
      width: "10%",
    },
    {
      name: "vrijeme",
      title: "vrijeme",
      width: "9%",
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
