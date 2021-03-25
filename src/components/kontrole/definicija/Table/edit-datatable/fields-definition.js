export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      dataClass: "text-center",
      width: "4%",
    },
    {
      name: "tip",
      title: "tip",
      width: "8%",
    },
    {
      name: "naziv",
      title: "naziv",
      sortField: "naziv",
      width: "15%",
    },
    {
      name: "proizvođač",
      title: "proizvođač",
      sortField: "proizvođač",
      width: "15%",
    },
    {
      name: "LOT",
      title: "LOT",
      sortField: "LOT",
      width: "10%",
    },

    {
      name: "rok",
      title: "rok",
      width: "14%",
    },
    {
      name: "analizator",
      title: "analizator",
      width: "9%",
    },
    {
      name: "reference",
      title: "reference",
      width: "9%",
    },
    {
      name: "uredi",
      title: "uredi",
      width: "8%",
    },
    {
      name: "akcija",
      title: "akcija",
      width: "8%",
    },
  ],
  sortFunctions: {
    name: function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
  },
};
