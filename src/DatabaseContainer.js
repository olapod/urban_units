// import database from './data/database_full';
// import fixed_units from './UnitsContainer';
const compare_databases = (database, fixed_units) => {
  //database
//przygotowanie danych do porównania
//zamiana stringa z numerem na numer
for (var i = 0; i < database.length; i++) {
    if (database[i].numer && database[i].numer.match(/^\d+/gi)) {
  database[i].numer = database[i].numer.match(/^\d+/gi);
   database[i].numer = parseInt(database[i].numer);
  }
  if (!database[i].ulica === null)
     database[i].ulica.trim();
}

//porównanie obu baz i przypisanie do databaseu jednostki urbanistycznej;
for (var k = 0; k < database.length; k++) {

  for (var i = 0; i < fixed_units.length; i++) {
    if (fixed_units[i].ULICA === database[k].ulica && fixed_units[i].NUMERY === Infinity) {

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



// var summary = [];
// for (var i = 1; i < 89; i++) {
//   var unit_summary = database.filter(item => item.jednostka == i).length;
//   summary.push({id: i, count: unit_summary})
//   };

// var problem_units = [];
// for (var i = 0; i < database.length; i++) {
//   if (!database[i].jednostka) {
//     problem_units.push(database[i]);
//   }
// }
// console.log('Porównanie: ', summary);
// console.log('Reszta: ', problem_units);
return database;
}
export default compare_databases;