import React from "react";
import CSVReader from 'react-csv-reader';
import compare_databases from './DatabaseContainer';
import convert_urban_units from './UnitsContainer';
import get_summary from './SummaryContainer';
import get_problem_units from './ProblemUnitsContainer'
import Summary from './Summary';

class DataLoadingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {urban_units: [], database: [], summary: [], problem_units: [], loading: false};
        this.handleClick = this.handleClick.bind(this);
      }

   loadUrbanUnits = units => {
    this.setState({
      urban_units: units
      })
  };

  loadDatabase = data => {
    this.setState({
      database: data
        })
  };

  getDataBase() {
    this.setState({
         database: compare_databases(this.state.database, convert_urban_units(this.state.urban_units))
    })
  };

  getSummary() {

    this.getDataBase();
    var summary = get_summary(this.state.database);
    this.getProblemUnits();
    return Promise.resolve(summary);


}

//   getSummary() {
//     this.getDataBase();
//     this.setState({
//       summary: get_summary(this.state.database),

//     })
//     this.getProblemUnits();
// }

  getProblemUnits() {
    this.setState({
      problem_units: get_problem_units(this.state.database)
    });
  }

  // hideSpinner() {
  //   // var loading = false
  //   this.setState({
  //     loading: false
  //   })
  //   // return Promise.resolve(loading);
  // }

  hideSpinner() {
    this.getSummary().then(res => {
      this.setState({
        summary: res,
        loading: false
      })

    })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
            loading: true
      } ,this.hideSpinner)
    }



    render() {
      const { loading, problem_units, summary } = this.state;
      console.log('Spr: ', loading);
      return (
        <div>
          <h1>Wgranie plików do porównania</h1>
          <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
          <CSVReader
            label="Wybierz plik CSV z bazą jednostek urbanistycznych"
            onFileLoaded={this.loadUrbanUnits}
            inputStyle={{color: 'red'}}
            parserOptions={{header: true}}
          />
          <CSVReader
            label="Wybierz plik CSV z bazą danych do porównania"
            onFileLoaded={this.loadDatabase}
            inputStyle={{color: 'red'}}
            parserOptions={{header: true}}
          />
          <button onClick={this.handleClick}>Porównaj oba pliki</button>

       <Summary loading={loading} summary={summary} problem_units={problem_units}/>

          </div>
      )}
};
export default DataLoadingContainer;