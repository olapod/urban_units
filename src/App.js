import React from "react";
import ReactDOM from "react-dom";
import data from './data/urban_units2'

const App = () => {
  var units_base = [{company:'IBM',street:'Agrestowa', no:'1'},
									{company:'Apple',street:'1-Maja',no:'103'},
									{company:'Asus',street: 'plac Ratuszowy',no:'13'}];

var urban_units = [
                  {id:'1',street: 'ul. 1 Maja 1f-13'},
									{id:'2',street: 'al. gen. Władysława Andersa nieparzyste: 4-14A'},
                  {id:'3',street: 'Plac Kołątaja parzyste: 1, 3 ,5 ,6 , 8, nieparzyste: 1'},
                   {id:'4', street: 'Borowików'}
                  ];


// var newArray = [{id:'1', company:'IBM',street:'Agrestowa', no:'1'},
// 							{id:'2', company:'Apple',street:'1-Maja',no:'103'},
// 							{id:'2', company:'Asus',street: 'plac Ratuszowy',no:'13'}];

//dzielenie stringa urban_units

//tworzenie poprawionej tablicy z obiektami bazy ju
var id = [];
var streets = [];
var numbers = [];

//tworze tablicę z id
for (var key in urban_units) {
    id.push(urban_units[key].id);
  };

//tworzenie tablicy z samymi nazwami ulic
for (var key in urban_units) {
    streets.push(urban_units[key].street);
  };

for(var i=0; i < streets.length; i++) {
 streets[i] = streets[i].replace(/(?<=([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]*))((\s\d|\sparzyste).*)/g, '');
}

console.log('Ulice: ', streets
           )
//tworzenie tablicy z samymi numerami (bez liter np.1a)
numbers = urban_units
  .map(unit => (unit.street.replace(/(?<=\d)[^\d,\-]/gi, "")));
//tworzenie tablicy z samymi numerami
for(var i=0; i < numbers.length; i++) {
 numbers[i] = numbers[i].match(/(?<=([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]*\s))((\d|parzyste|nieparzyste).*)/g);
}
//Przerobienie tablic w tablicy w tablicę ze stringami
for(var i=0; i < numbers.length; i++) {
   if (numbers[i] === null) {
    numbers[i] = Number.POSITIVE_INFINITY;
   }
   else {
    numbers[i] = numbers[i].join();
   }
};

console.log('duopa', typeof numbers[1]);

//Funkcja konwersji stringa z zakresu numerów na same numery
function convertRangeToNumbers(str) {

  function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
  //parzyste i nieparzyste z zakresem liczb
 if (str.match(/^parzyste: \d+\-\d+, nieparzyste/g)) {
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

        var even_result = range(even_s[0], even_e[0]);
        var odd_result = range(odd_s[0], odd_e[0]);
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
        console.log('chuj: ', str);
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
  if (str.match(/^[0-9,]+$/g)) {
    console.log('nowe: ', str);
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
    console.log('stare: ', odd);
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

  //parzyste i nieparzyste bez zakresu, tylko po przecinku
  if (str.match(/^parzyste: \d+,\s.*nieparzyste:\s\d+.*/g)) {
    str = str.replace(/^\bparzyste:\s\b/g,'').replace(/\bnieparzyste:\s\b/g,'');

        var strToNumber = str.split(',').map(Number);
        return strToNumber;
    }
 }
//gotowa tablica z numerami
console.log('telele: ', numbers);
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

   console.log('dgiudg: ', fixedNumbers);

  return (
    <div>
      <p>React here!</p>
    </div>
  );
};

function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
var arr = range(1, 18);
var arrex = [];

for (var i = 0; i < arr.length; i++) {
  if ((arr[i] % 2) === 1) {
      arrex.push(arr[i]);
  }
}

var wynik = arr.join(', ');


console.log('Wynik: ', wynik);

export default App;
ReactDOM.render(<App />, document.getElementById("app"));
