export default {
  tableFields: [
    {
      name: "protokol",
      title: "protokol",
      width: "15%"
    },
    {
      name: "integracija",
      title: "integracija",
      width: "20%"
    },
    {
      name: "ime",
      sortField: "ime",
      width: "15%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "20%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      sortField: "jmbg",
      width: "15%"
    },
    {
      name: "izmjena",
      title: "izmjena",
      width: "15%"
    }
  ],

  sortFunctions: {
    ime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    prezime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    jmbg: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
