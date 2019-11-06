import regon from "./RegonContainer";

var lack = [];
for (var i = 0; i < regon.length; i++) {
  if (!regon[i].jednostka) {
    lack.push(regon[i]);
  }
  // if (regon[i].ulica === 'Plac Wolności') {
  //   console.log('Na ulicy: ', regon[i])
  // }
}

export default lack;