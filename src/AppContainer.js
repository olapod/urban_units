import regon from "./RegonContainer";

//podsumowanie porównania
var summary = [];
for (var i = 1; i < 89; i++) {
var unit_summary = regon.filter(item => item.jednostka === i).length;
summary.push({id: i, count: unit_summary})
};

export default summary;
