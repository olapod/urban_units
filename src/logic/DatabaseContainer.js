const compare_databases = (database, fixed_units) => {

//przygotowanie danych do porównania
//zamiana stringa z numerem na numer
console.time('compare_function_1');
  for (var i = 0; i < database.length; i++) {
    if (database[i].numer && database[i].numer.match(/^\d+/gi)) {
      database[i].numer = database[i].numer.match(/^\d+/gi);
      database[i].numer = parseInt(database[i].numer);
    }
  }
console.timeEnd('compare_function_1');

  //usunucięcie zbędnych spacji i zamiana nazw na małe litery
  console.time('compare_function_2');
  for (var i = 0; i < database.length; i++) {
    if (database[i].ulica) {
      database[i].ulica = database[i].ulica.trim();
      database[i].ulica = database[i].ulica.replace(/\s{2,}/g, ' ');
      database[i].ulica = database[i].ulica.toLowerCase();
    }
  }
  console.timeEnd('compare_function_2');
  //porównanie obu baz i przypisanie do databaseu jednostki urbanistycznej;
  console.time('compare_function_3');
  for (var k = 0; k < database.length; k++) {

    for (var i = 0; i < fixed_units.length; i++) {
      if (fixed_units[i].ULICA === database[k].ulica && fixed_units[i].NUMERY === Infinity) {
        database[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
        database[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
      }

      if (fixed_units[i].ULICA === database[k].ulica && Array.isArray(fixed_units[i].NUMERY) && fixed_units[i].NUMERY.includes(database[k].numer)) {
        database[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
      }

      if (fixed_units[i].ULICA === database[k].ulica &&  typeof fixed_units[i].NUMERY === 'object' && fixed_units[i].NUMERY.no === Infinity && !fixed_units[i].NUMERY.exception.includes(database[k].numer)) {
      database[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
      }

      if (fixed_units[i].ULICA === database[k].ulica && database[k].numer === null) {
        database[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
      }

  }
  }
  console.timeEnd('compare_function_3');
  // console.log('Baza: ', database[1])
  // console.log('Jednostki: ', fixed_units[10])
  return database;
}
export default compare_databases;