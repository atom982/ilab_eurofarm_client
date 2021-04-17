var Samples = require("./Type");

module.exports = {
  Selection: function(site, test, godina, spol, drstanje, menopauza, manual, calculated) {
    return Samples.Return(test, godina, spol, drstanje, menopauza, manual, calculated);
  }
};
