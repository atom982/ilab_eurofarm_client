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
      name: "nalazipregled",
      title: "",
      width: "7%"
    },

    {
      name: "en",
      title: "",
      width: "7%"
    },

    {
      name: "de",
      title: "",
      width: "7%"
    }, // 12 + 21 = 33

    {
      name: "pacdata",
      title: "",
      width: "2"
    }, // 35
    {
      name: "viber",
      title: "viber",
      width: "8"
    }, // 43
    {
      name: "ime",
      sortField: "ime",
      width: "11%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "15%"
    }, // 43 + 26 = 69
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
    // {
    //   name: "biljeskaIcon",
    //   title: "",
    //   width: "2.5%",
    // },
    
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
