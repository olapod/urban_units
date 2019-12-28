import convert_urban_units from '../logic/UnitsContainer';
import compare_databases from '../logic/DatabaseContainer';
import get_summary from '../logic/SummaryContainer';
import get_problem_units from '../logic/ProblemUnitsContainer';

// export default function WebWorker(args) {
//   onmessage = (urban_units, database) => {
//     const { units } = urban_units;
//     const { data } = database;
//     const converted_units = convert_urban_units(units);
//     const compared_databases = compare_databases(data, converted_units);
//     const summary = get_summary(compared_databases);
//     const problem_units = get_problem_units(compared_databases);

//   postMessage({ compared_databases: compared_databases,
//                   converted_units: converted_units,
//                   summary: summary,
//                   problem_units: problem_units
//     });
//   }
// }

export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
      if (!e) return;
      var units = e.data.urban_units;
      var data = e.data.database;
      console.log('Check: ', data);

      const converted_units = convert_urban_units(units);
      const compared_databases = compare_databases(data, converted_units);
      const summary = get_summary(compared_databases);
      const problem_units = get_problem_units(compared_databases);

    postMessage({ compared_databases: compared_databases,
                  converted_units: converted_units,
                  summary: summary,
                  problem_units: problem_units
    });
  });
};