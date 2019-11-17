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
    this.setState({
      summary: summary
      })
    return Promise.resolve(summary);
  }

  getProblemUnits() {
    this.setState({
      problem_units: get_problem_units(this.state.database)
    });
  }

  showSpinner() {
    this.setState({
      loading: true
    })
  }

  hideSpinner() {
    this.setState({
      loading: false
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({loading: true},() => {
    this.getSummary()
    .then(res => {
      this.getProblemUnits();
      })
      .then(res => {
        this.hideSpinner();
        })
    })
  }

    renderSummary() {
      const { loading, problem_units, summary } = this.state;
      console.log('Spr: ', this.state.loading);
      if(loading === true) {
        return (
          <div>
        <p>Przetwarzam dane....</p>
          </div>
        )}
        if(summary.length > 0 && loading === false) {
          return (
            <div>
            <Summary summary={summary} problem_units={problem_units}/>
            </div>
          )
          }
    }

    render() {
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
          {this.renderSummary()}
          </div>
      )}
};
export default DataLoadingContainer;