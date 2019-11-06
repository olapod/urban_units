import regon from './data/regon_full';
import fixed_units from './UnitsContainer';

//REGON
//przygotowanie danych do porównania
//zamiana stringa z numerem na numer
for (var i = 0; i < regon.length; i++) {
   if (regon[i].numer && regon[i].numer.match(/^\d+/gi)) {
  regon[i].numer = regon[i].numer.match(/^\d+/gi);
   regon[i].numer = parseInt(regon[i].numer);
  }
  if (!regon[i].ulica === null)
     regon[i].ulica.trim();
}

//porównanie obu baz i przypisanie do regonu jednostki urbanistycznej;
for (var k = 0; k < regon.length; k++) {

  for (var i = 0; i < fixed_units.length; i++) {
    if (fixed_units[i].ULICA === regon[k].ulica && fixed_units[i].NUMERY === Infinity) {

      regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;

    }

    if (fixed_units[i].ULICA === regon[k].ulica && Array.isArray(fixed_units[i].NUMERY) && fixed_units[i].NUMERY.includes(regon[k].numer)) {
      regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;


    }

    if (fixed_units[i].ULICA === regon[k].ulica &&  typeof fixed_units[i].NUMERY === 'object' && fixed_units[i].NUMERY.no === Infinity && !fixed_units[i].NUMERY.exception.includes(regon[k].numer)) {
    regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
    }

    if (fixed_units[i].ULICA === regon[k].ulica && regon[k].numer === null) {
      regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
      }
 }
}

export default regon;