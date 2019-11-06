import urban_units from './data/urban_units2';

//SFORMATOWANIE BAZY JEDNOSTEK URBANISTYCZNYCH

//dzielenie stringa urban_units[i].ULICA

//tworzenie poprawionej tablicy z obiektami bazy
var streets = [];
var numbers = [];

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

export default fixed_units;