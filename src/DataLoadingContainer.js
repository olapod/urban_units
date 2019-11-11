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
        this.state = {urban_units: [], database: [], summary: [], problem_units: [], clickButton: false};
        this.handleClick = this.handleClick.bind(this);
      }

    loadUrbanUnits = units => {
    this.setState({
        urban_units: units
          });
  };

  loadDatabase = data => {
    this.setState({
        database: data
      });
  };

  getDataBase() {
    this.setState({
      database: compare_databases(this.state.database, convert_urban_units(this.state.urban_units)),
    });
  }
  getSummary() {
    this.getDataBase();
    this.setState({
      summary: get_summary(this.state.database)
    });
  }

  getProblemUnits() {
    this.setState({
      problem_units: get_problem_units(this.state.database)
    });
  }

    handleClick() {
      this.setState({
        clickButton: true
      });
      this.getSummary();
      this.getProblemUnits();
    }

renderUpload() {

       return (
    <div>
      <h1>Wgranie plików do porównania</h1>
      <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      <CSVReader
        label="Wybierz plik CSV z bazą jednostek urbanistycznych"
        onFileLoaded={this.loadUrbanUnits}
        // inputId="ObiWan"
        inputStyle={{color: 'red'}}
        parserOptions={{header: true}}
        // fileEncoding="UTF-8"
      />
      <CSVReader
        label="Wybierz plik CSV z bazą danych do porównania"
        onFileLoaded={this.loadDatabase}
        // inputId="ObiWan"
        inputStyle={{color: 'red'}}
        parserOptions={{header: true}}
        // fileEncoding="UTF-8"
      />
      <button onClick={this.handleClick}>Porównaj oba pliki</button>
       </div> )}

      // renderSpinner() {
      // if (this.state.clickButton === true) { return (<p>Trwa porównywanie plików...</p>)}
      // else {return null}
      // }

      renderSummary() {
      if (this.state.summary.length) { return (<Summary summary={this.state.summary} problem_units={this.state.problem_units}/>)}
      else {return null}
      }

      render () {
        return (
          <div>
            {this.renderUpload()}
            {/* {this.renderSpinner()} */}
            {this.renderSummary()}
          </div>
        );
      }
 };
export default DataLoadingContainer;