export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "4%"
    },
    {
      name: "prijem",
      title: "prijem",
      width: "14%"
    },
    {
      name: "ime",
      title: "ime",
      sortField: "ime",
      width: "12%"
    }, // 29
    {
      name: "prezime",
      title: "prezime",
      sortField: "prezime",
      width: "17%"
    },  
    {
      name: "godište",
      title: "godište",
      width: "9%"
    }, // 56

    {
      name: "kontakt",
      title: "telefon",
      width: "12%"
    },  

    {
      name: "analysis",
      title: "zahtjev",
      width: "12%"
    }, // 80
    {
      name: "svrha",
      title: "svrha",
      width: "10%"
    }, // 
    {
      name: "detalji",
      title: "detalji",
      width: "10%"
    } // 100
  ],
  sortFunctions: {
    id: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
