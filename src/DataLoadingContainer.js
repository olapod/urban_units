import React from "react";
import CSVReader from 'react-csv-reader';
import compare_databases from './DatabaseContainer';
import convert_urban_units from './UnitsContainer';
import get_summary from './SummaryContainer';
import get_problem_units from './ProblemUnitsContainer';
import Summary from './Summary';


class DataLoadingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {urban_units: [], database: [], summary: [], problem_units: [], loading: false, converted_units: []};
        this.initialState = { ...this.state }
        this.handleClick = this.handleClick.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
      }

   loadUrbanUnits = units => {
    this.setState({
      urban_units: units,
      })
      this.convertUnits();
  };

  loadDatabase = data => {
    this.setState({
      database: data
        })

  };

convertUnits() {
  this.setState({
    converted_units: convert_urban_units(this.state.urban_units)
      })
}
  getDataBase() {
    this.setState({
        database: compare_databases(this.state.database, this.state.converted_units)
    })
  };

 getSummary () {
    this.getDataBase();
    var summary = get_summary(this.state.database);
    this.getProblemUnits();
        return new Promise(
      function (resolve, reject) {
        resolve(summary);
})
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

   handleClick = (event) => {
    event.preventDefault();

    this.setState({ loading: true }, () => {
    this.getSummary()
      .then(result => this.setState({
          loading: false,
          summary: result
        }))
      })
    }

  resetHandler() {
    this.setState(this.initialState);
  }

    render() {
      const { loading, problem_units, summary, database, converted_units, urban_units } = this.state;
      console.log('Spr: ', loading);

      if(!database.length || !urban_units.length) {
      return (
        <div className='DataLoadingContainer'>
          <div className='csv_title'>
            <h4>Wgranie plików do porównania</h4>
            <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
          </div>
          <div className='container'>
            <div className='csv'>

              <CSVReader
                label="Wybierz plik CSV z bazą jednostek urbanistycznych"
                onFileLoaded={this.loadUrbanUnits}
                inputStyle={{ color: 'red' }}
                parserOptions={{header: true}}
                cssClass="csv-reader-input"
                cssInputClass='csv-input'
                inputId='file'
              />
              {/* <label htmlFor="file">Wybierz plik CSV z bazą jednostek urbanistycznych</label> */}
              <p>Plik dostarcza Wydział RG</p><br/>
            </div>
            <div className='csv'>
              <CSVReader
                label="Wybierz plik CSV z bazą danych do porównania "
                onFileLoaded={this.loadDatabase}
                inputStyle={{color: 'red'}}
                parserOptions={{header: true}}
                cssClass="csv-reader-input"
                cssInputClass='csv-input'
              />

              <p>Plik powinien zawierać kolumnę o nazwię "ulica" oraz kolumnę o nazwie "numer". Ulice powinny mieć zapis dokładnie taki sam jak w bazie jednostek urbanistycznych. Wielkość liter ma znaczenie!!! </p><br/>
            </div>
          </div>
        </div>
      )}
      if(database.length && urban_units.length && !summary.length) {
      return (
        <div className='DataLoadingContainer compare'>
          <p className="compare_text">Pliki do porównania zostały wgrane.</p>
          <div className='button_div'>
            <button onClick={this.handleClick} className='button_compare button'>Porównaj oba pliki</button>
          </div>
        </div>
      )}
      if (loading) {
        return (
          <div className='DataLoadingContainer spinner'>
           <span>wczytuje dane...</span>
          </div>
       )};
      if(summary.length) {
        return (
          <div className='DataLoadingContainer'>
         <Summary summary={summary} problem_units={problem_units} database={database} converted_units={converted_units} action={this.resetHandler}/>
          </div>
        )}
  };
};
export default DataLoadingContainer;