const get_summary = (database, units) => {
  var summary = [];
  for (var i = 1; i < 89; i++) {
    var unit_summary = database.filter(item => item.jednostka == i).length;
    // var district = units.map(item => item.DZIELNICA)
    summary.push({id: i, count: unit_summary,
      // district: district
    })
  };
  return summary;
};

export default get_summary;