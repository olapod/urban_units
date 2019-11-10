import React from "react";
import CSVReader from 'react-csv-reader';
import compare_databases from './RegonContainer';
import convert_urban_units from './UnitsContainer';
import Summary from './Summary';

class DataLoadingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {urban_units: [], database: [], summary: []};
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

  getSummary() {
      return compare_databases(this.state.database, convert_urban_units(this.state.urban_units));
      debugger;
    };

    handleClick() {
      // this.getSummary();
      this.setState({
        summary:  this.getSummary()
        });
    }
render() {

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
       <Summary summary={this.state.summary}/>
    </div>
  );
       }
};
export default DataLoadingContainer;