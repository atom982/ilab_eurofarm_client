export default {
  tableFields: [

    {
      name: "delivered",
      title: "",
      width: "4%"
    },

    {
      name: "atoutbox",
      title: "",
      width: "16%"
    },

    {
      name: "ime",
      sortField: "ime",
      width: "11%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "16%"
    },
    {
      name: "godiste",
      title: "godište",
      width: "8%"
    },
    {
      name: "kontakt",
      title: "telefon",
      width: "11%"
    },

    {
      name: "to",
      title: "adresa",
      width: "22%"
    },

    
    
    
    {
      name: "izmjena",
      title: "datum i vrijeme",
      width: "12%"
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
