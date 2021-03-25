export default {
  tableFields: [
    
    {
      name: "sifra",
      title: "sifra",
      sortField: "sifra",
      width: "10%"
    },
    {
      name: "naziv",
      title: "naziv",
      sortField: "naziv",
      width: "10%"
    },
    {
      name: "analit",
      title: "analit",
      sortField: "analit",
      width: "20%"
    },
    {
      name: "jedinica",
      title: "jedinica",
      width: "10%"
    },
    {
      name: "multi",
      title: "multi",
      width: "10%"
    },
    {
      name: "order",
      title: "order",
      sortField: "order",
      width: "10%"
    },
    {
      name: "sekcija",
      title: "sekcija",
      sortField: "sekcija",
      width: "20%"
    },
    {
      name: "uredi",
      title: "uredi",
      width: "10%"
    }
   
  ],
  sortFunctions: {
    name: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
