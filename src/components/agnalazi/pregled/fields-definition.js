export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      width: "2%",
    },
    {
      name: "protokol",
      title: "protokol",
      sortField: "protokol",
      width: "10%",
    },
    {
      name: "agnalazipregled",
      title: "",
      width: "7%"
    },
    {
      name: "agen",
      title: "",
      width: "7%"
    },
    {
      name: "agde",
      title: "",
      width: "7%"
    }, 
    {
      name: "email",
      title: "email",
      titleClass: 'text-center',
      dataClass: 'text-center',
      width: "5"
    },
    {
      name: "viber",
      title: "viber",
      titleClass: 'text-center',
      dataClass: 'text-center',
      width: "5"
    }, 
    {
      name: "ime",
      sortField: "ime",
      width: "11%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "15%"
    }, 
    {
      name: "kontakt",
      title: "kontakt",

      width: "13%"
    }, 
    {
      name: "izmjena",
      title: "datum",
      width: "10%"
    },
    {
      name: "time",
      title: "vrijeme",
      width: "8%"
    },    
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
