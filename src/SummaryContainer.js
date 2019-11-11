const get_summary = (database) => {
    var summary = []
    for (var i = 1; i < 89; i++) {
  var unit_summary = database.filter(item => item.jednostka == i).length;
  summary.push({id: i, count: unit_summary})
  };
  return summary;
}

export default get_summary;