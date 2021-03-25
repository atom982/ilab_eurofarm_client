export default {
  tableFields: [
    {
      name: "kod",
      title: "kod",
      sortField: "kod",
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
      name: "tip",
      title: "tip",
      width: "10%"
    },
    {
      name: "analizator",
      title: "analizator",
      width: "18%"
    },
    {
      name: "metoda",
      title: "metoda",
      width: "10%"
    },
    
    {
      name: "reference",
      title: "reference",
      width: "12%"
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
