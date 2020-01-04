const compare_databases = require('./DatabaseContainer');
const database = require('../_tests_/regon_full.json');
const fixed_units = require('../_tests_/fixed_urban_units.json');


// test('Person constructs with a first and last name', () => {
//   let testDatabase = new Person('John', 'Doe')
//   expect(testPerson).toEqual({firstName: 'John', lastName: 'Doe'});
// });
// test('fullName returns Person instance full name', () => {
//   let testPerson = new Person('John', 'Doe')
//   expect(testPerson.fullName()).toBe('John Doe');
// });