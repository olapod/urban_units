import React from "react";
import ReactDOM from "react-dom";
import urban_units from './data/urban_units2';
import regon from './data/regon';

const App = () => {

//dzielenie stringa urban_units

//tworzenie poprawionej tablicy z obiektami bazy
var streets = [];
var numbers = [];

// var regon = [
//   {
//   "regon": "24172614400020",
//   "nazwa": "BBA MOPED&SCOOTER ELENA JURCZYK",
//   "kod poczty": "43300",
//   "miejscowość poczty": "Bielsko-Biała",
//   "miejscowość": "Bielsko-Biała",
//   "ulica": "ul. 1 Maja",
//   "numer": "24",
//   "numer lokalu": "",
//   "nietypowe miejsce likalizacji": "BBA MOPED&SCOOTER ELENA JURCZYK",
//   "pkd": "4540Z",
//   "data rozpoczęcia działalności": "2015-04-24",
//   "ape": "01",
//   "zakodowana przewidywana liczba pracujących": "A"},
//   {
// 		"regon": "24159810800029",
// 		"nazwa": "PPHU STUDIO DOM Małgorzata Białek",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "ul. Bystrzańska",
// 		"numer": "29",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "4751Z",
// 		"data rozpoczęcia działalności": "2018-05-01",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
//   },
//   {
// 		"regon": "24364218000027",
// 		"nazwa": "BMB Beata Białek",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "ul. Dzwonkowa",
// 		"numer": "51",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "7022Z",
// 		"data rozpoczęcia działalności": "2015-11-01",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
//   },
//   {
// 		"regon": "01030030300050",
// 		"nazwa": "KRAJOWE BIURO WYBORCZE DELEGATURA W BIELSKU BIAŁEJ",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "ul. Piastowska",
// 		"numer": "40",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "8411Z",
// 		"data rozpoczęcia działalności": "1996-01-04",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
//   },
//   {
// 		"regon": "12018331200080",
// 		"nazwa": "WANDA KARASIŃSKA KANCELARIA DORADCY PODATKOWEGO",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "ul. Piastowska",
// 		"numer": "63A",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "6920Z",
// 		"data rozpoczęcia działalności": "2018-09-14",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
//   },
//   {
// 		"regon": "24117846400221",
// 		"nazwa": "BY DZIUBEKA TOMASZ DZIUBEK",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "ul. gen. Józefa Kustronia",
// 		"numer": "15",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "4777Z",
// 		"data rozpoczęcia działalności": "2017-07-01",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
//   },
//   {
// 		"regon": "27359693000023",
// 		"nazwa": "DUO",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "al. Armii Krajowej",
// 		"numer": "88",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "4777Z",
// 		"data rozpoczęcia działalności": "2005-10-21",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
// 	},
// 	{
// 		"regon": "24187719100045",
// 		"nazwa": "FIRMA HANDLOWA EWELINA STUDNICKA",
// 		"kod poczty": "43300",
// 		"miejscowość poczty": "Bielsko-Biała",
// 		"miejscowość": "Bielsko-Biała",
// 		"ulica": "ul. Saperów",
// 		"numer": "82",
// 		"numer lokalu": "",
// 		"nietypowe miejsce likalizacji": "",
// 		"pkd": "4761Z",
// 		"data rozpoczęcia działalności": "2013-09-01",
// 		"ape": "01",
// 		"zakodowana przewidywana liczba pracujących": "A"
// 	}
// ];


//tworzenie tablicy z samymi nazwami ulic
for (var key in urban_units) {
    streets.push(urban_units[key].ULICA);
  };

for(var i=0; i < streets.length; i++) {
  streets[i] = streets[i].replace(/(?<=([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]*))((\s\d|\sparzyste|\snieparzyste|\sza wyjątkiem).*)/g, '');
}

//tworzenie tablicy z samymi numerami (bez liter np.1a)
numbers = urban_units
  .map(unit => (unit.ULICA.replace(/(?<=\d)[^\d,\-]/gi, "")));
//tworzenie tablicy z samymi numerami
for(var i=0; i < numbers.length; i++) {
 numbers[i] = numbers[i].match(/(?<=([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]*\s))((\d|parzyste|nieparzyste|za wyjątkiem).*)/g);
}

//Przerobienie w tablicę ze stringami i infinity
for(var i=0; i < numbers.length; i++) {
   if (numbers[i] === null) {
    numbers[i] = Number.POSITIVE_INFINITY;
   }
   else {
    numbers[i] = numbers[i].join();
   }

};

//Funkcja konwersji stringa z zakresu numerów na same numery
function convertRangeToNumbers(str) {

  function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
  //parzyste i nieparzyste z zakresem liczb
 if (str.match(/^parzyste:\s\d+-\d+,\snieparzyste:\s\d+-\d+/g)) {
        var even = str.match(/[\d\-]+(?=,\s)/g);
        var odd = str.match(/\d+\-\d+$/g);

        var even_start = even[0].match(/^\d+/g);
        var even_s = even_start.map(function(e) { return parseInt(e)});
        var even_end = even[0].match(/[\d]+$/g);
        var even_e = even_end.map(function(e) { return parseInt(e) });

        var odd_start = odd[0].match(/^\d+/g);
        var odd_s = odd_start.map(function(e) { return parseInt(e) })
        var odd_end = odd[0].match(/[\d]+$/g);
        var odd_e = odd_end.map(function(e) { return parseInt(e) })
        // if (even_s.length && even_e.lenght && odd_s.length && odd_e.length) {
        var even_result = range(even_s[0], even_e[0]);
        var odd_result = range(odd_s[0], odd_e[0]);
      // }
        // else (console.log('zlap: ', str))

        //dzielę na zbiory parzyste i nieparzyste
        var evens = [];
        var odds = [];
          for (var i = 0; i < even_result.length; i++) {
              if ((even_result[i] % 2) != 1) {
                  evens.push(even_result[i]);
              }
          }
          for (var i = 0; i < odd_result.length; i++) {
            if ((odd_result[i] % 2) == 1) {
                odds.push(odd_result[i]);
            }
        }
        odds.toString();
        evens.toString();
        var result = evens + ',' + odds;
        str = str.replace(/^parzyste.*/g, result);
        var strToNumber = str.split(',').map(Number);
        return strToNumber;

        }
//sam zakres liczb bez podziału na parzyste i nieparzyste
  if (str.match(/^\d+\-\d+/g)) {
        var num = str.match(/^\d+\-\d+/g);
        var num_start = num[0].match(/^\d+/g);
        var num_s = num_start.map(function(e) { return parseInt(e) });
        var num_end = num[0].match(/[\d]+$/g);
        var num_e = num_end.map(function(e) { return parseInt(e) })
        var result = range(num_s[0], num_e[0]);
        result.toString();
        str = str.replace(/^\d+\-\d+/g, result);
        var strToNumber = str.split(',').map(Number);
        return strToNumber;
    }
//same liczby po przecinku
  if (str.match(/^[0-9,\s]+$/g)) {
    var strToNumber = str.split(',').map(Number);
        return strToNumber;
  }

  //same parzyste z zakresem
  if (str.match(/^parzyste: \d+\-\d+$/g)) {
    var even = str.match(/\d+\-\d+$/g);
    var even_start = even[0].match(/^\d+/g);
    var even_s = even_start.map(function(e) { return parseInt(e)});
    var even_end = even[0].match(/[\d]+$/g);
    var even_e = even_end.map(function(e) { return parseInt(e) });

    var even_result = range(even_s[0], even_e[0]);
      //dzielę na zbiory nieparzyste
    var evens = [];

      for (var i = 0; i < even_result.length; i++) {
          if ((even_result[i] % 2) != 1) {
              evens.push(even_result[i]);
          }
      }
    var result = evens.toString();
    str = str.replace(/^parzyste.*/g, result);
    var strToNumber = str.split(',').map(Number);
    return strToNumber;
    }

  //same nieparzyste z zakresem
  if (str.match(/^nieparzyste: \d+\-\d+$/g)) {
    var odd = str.match(/\d+\-\d+$/g);
    var odd_start = odd[0].match(/^\d+/g);
    var odd_s = odd_start.map(function(e) { return parseInt(e)});
    var odd_end = odd[0].match(/[\d]+$/g);
    var odd_e = odd_end.map(function(e) { return parseInt(e) });

    var odd_result = range(odd_s[0], odd_e[0]);
      //dzielę na zbiory nieparzyste
    var odds = [];

    for (var i = 0; i < odd_result.length; i++) {
      if ((odd_result[i] % 2) == 1) {
          odds.push(odd_result[i]);
      }
  }
    var result = odds.toString();
    str = str.replace(/^nieparzyste.*/g, result);
    var strToNumber = str.split(',').map(Number);
    return strToNumber;
    }

    //za wyjątkiem
  if (str.match(/^za wyjątkiem nr/g)) {
      var exception = str.match(/\d.*/g);
      exception = exception[0].split(',').map(Number);
      // var exceptionToNumber = exception.split(',').map(Number);
      var numbers = {no: Number.POSITIVE_INFINITY, exception: exception};
      return numbers;
    }

    else {
      console.log('Sprawdzam: ', str);
    }

 }
//gotowa tablica z numerami
var fixedNumbers = [];

  for(var i=0; i < numbers.length; i++) {
    if (typeof numbers[i] === 'string')
    {
    fixedNumbers.push(convertRangeToNumbers(numbers[i]));
    }
    else {
      fixedNumbers.push(numbers[i])
    }
   };
//GOTOWA BAZA JEDNOSTEK URBANISTYCZNYCH

var fixed_units = urban_units.map( ({ DZIELNICA, JEDNOSTKA_URBANISTYCZNA, NR_PAD, ID }) => ({ DZIELNICA, JEDNOSTKA_URBANISTYCZNA, NR_PAD, ID }) );

for(var i=0; i < fixed_units.length; i++) {
  fixed_units[i].ULICA = streets[i];
  fixed_units[i].NUMERY = fixedNumbers[i];
}
// console.log(fixed_units)

//REGON
//przygotowanie danych do porównania
//zamiana stringa z numerem na numer
for (var i = 0; i < regon.length; i++) {
   if (regon[i].numer.match(/^\d+/gi)) {
  regon[i].numer = regon[i].numer.match(/^\d+/gi);
  regon[i].numer = parseInt(regon[i].numer);
  }
}

for (var i = 0; i < fixed_units.length; i++) {

  for (var k = 0; k < regon.length; k++) {
    if (fixed_units[i].ULICA === regon[k].ulica && fixed_units[i].NUMERY === Infinity) {
      // console.log('co1: ', fixed_units[i].ULICA, regon[k].ulica, fixed_units[i].NUMERY, regon[k].numer, 'jednostka: ', fixed_units[i].JEDNOSTKA_URBANISTYCZNA);
      regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;

    }

    if (fixed_units[i].ULICA === regon[k].ulica && Array.isArray(fixed_units[i].NUMERY) && fixed_units[i].NUMERY.includes(regon[k].numer)) {
      regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
      // console.log('co2: ', fixed_units[i].ULICA, regon[k].ulica, fixed_units[i].NUMERY, regon[k].numer, 'jednostka: ', fixed_units[i].JEDNOSTKA_URBANISTYCZNA);

    }

    if (fixed_units[i].ULICA === regon[k].ulica &&  typeof fixed_units[i].NUMERY === 'object' && fixed_units[i].NUMERY.no === Infinity && !fixed_units[i].NUMERY.exception.includes(regon[k].numer)) {
    regon[k].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
    // console.log('co3: ', fixed_units[i].ULICA, regon[k].ulica, fixed_units[i].NUMERY, regon[k].numer, 'jednostka: ', fixed_units[i].JEDNOSTKA_URBANISTYCZNA);

  }
 }
}
// console.log('Wynik: ', regon);
var lack = [];
for (var i = 0; i < regon.length; i++) {
  if (!regon[i].jednostka) {

    lack.push(...regon[i]);

  }
}
console.log('Adresy bez jednostki: ', lack)


// for (var i = 0; i < fixed_units.length; i++) {
// if (fixed_units[i].ULICA === regon[2].ulica && (fixed_units[i].NUMERY === Infinity || fixed_units[i].NUMERY.includes(regon[2].numer) || (fixed_units[i].NUMERY[0] === Infinity && !fixed_units[i].NUMERY[1].includes(regon[2].numer)))) {
//   regon[2].jednostka = fixed_units[i].JEDNOSTKA_URBANISTYCZNA;
//   console.log('Test2: ', fixed_units[i], 'regon: ', regon[2])
// }
// }

       return (
    <div>
      <p>React here!</p>
    </div>
  );
};
// function range(start, end) {
//   return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
// }
// var arr = range(34, 89);
// var arrex = [];

// for (var i = 0; i < arr.length; i++) {
//   if ((arr[i] % 2) === 1) {
//       arrex.push(arr[i]);  }
// }

// var wynik = arr.join(', ');


// console.log('Wynik: ', wynik);

export default App;
ReactDOM.render(<App />, document.getElementById("app"));
