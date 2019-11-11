const get_problem_units = (database) => {
    var problem_units = [];
for (var i = 0; i < database.length; i++) {
  if (!database[i].jednostka) {
    problem_units.push(database[i]);
  }
}
  return problem_units;
}

export default get_problem_units;