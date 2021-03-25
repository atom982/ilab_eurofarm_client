function Type(manual, calculated) {
  if (!manual && !calculated) {
    return ["Lab", true, true];
  } else if (manual && !calculated) {
    return ["Man", true, true];
  } else if (!manual && calculated) {
    return ["Calc", true, true];
  } else if (manual && calculated) {
    return ["Calc", true, true];
  }
}

module.exports = {
  Return: function (test, godina, spol, drstanje, menopauza, manual, calculated) {
    switch (test) {
      default:
        return Type(manual, calculated);
        break;
    }
  }
};
