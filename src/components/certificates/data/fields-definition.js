export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "5%"
    },
    {
      name: "ba",
      title: "",
      width: "10%"
    },
    {
      name: "en",
      title: "",
      width: "10%"
    },
    {
      name: "de",
      title: "",
      width: "10%"
    }, // 35
    {
      name: "ime",
      title: "ime",
      sortField: "ime",
      width: "13%"
    }, 
    {
      name: "prezime",
      title: "prezime",
      sortField: "prezime",
      width: "17%"
    }, // 65
    {
      name: "godište",
      title: "godište",
      width: "10%"
    }, 
    {
      name: "kontakt",
      title: "telefon",
      width: "15%"
    },  
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
