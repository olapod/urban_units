import regon from "./RegonContainer";

var problem_units = [];
for (var i = 0; i < regon.length; i++) {
  if (!regon[i].jednostka) {
    problem_units.push(regon[i]);
  }
  // if (regon[i].ulica === 'Plac Wolności') {
  //   console.log('Na ulicy: ', regon[i])
  // }
}

export default problem_units;