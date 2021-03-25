export default {
  tableFields: [
    {
      name: "ID",
      title: "ID",
      sortField: "ID",
      width: "16%"
    },
    {
      name: "KLIJENT",
      title: "KLIJENT",
      sortField: "KLIJENT",
      width: "20%"
    },
    {
      name: "DOBAVLJAC",
      title: "DOBAVLJAC",
      sortField: "DOBAVLJAC",
      width: "20%"
    },
    {
      name: "STATUS",
      title: "STATUS",
      width: "10%"
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
      sortField: "IZMJENI",
      width: "20%"
    }
  ],
  sortFunctions: {
    id: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
