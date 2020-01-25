import convert_urban_units from './logic/UnitsContainer';
import compare_databases from './logic/DatabaseContainer';
import get_summary from './logic/SummaryContainer';
import get_problem_units from './logic/ProblemUnitsContainer';

  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
      if (!e) return;
      const units = e.data.urban_units;
      const data = e.data.database;
      const converted_units = convert_urban_units(units);
      const compared_databases = compare_databases(data, converted_units);
      const summary = get_summary(compared_databases, converted_units);
      const problem_units = get_problem_units(compared_databases);

    postMessage({ compared_databases: compared_databases,
                  converted_units: converted_units,
                  summary: summary,
                  problem_units: problem_units,
                  loading: false,
                  error: false
    });
  });

  self.onerror = function (e) {
    console.log(e);
    postMessage({ error: true
   });
  };

