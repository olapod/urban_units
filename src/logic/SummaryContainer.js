const get_summary = (database, units) => {
  var summary = [];
  console.log('Test2: ', units)
  for (var i = 0; i < 89; i++) {
    var unit_summary = database.filter(item => item.jednostka == i).length;
    // unit_summary.toString();
    var district = units.find(item => item.JEDNOSTKA_URBANISTYCZNA == i).DZIELNICA
    // i.toString();
    summary.push({id: i, count: unit_summary, district: district
    })
  };
  return summary;
};

export default get_summary;