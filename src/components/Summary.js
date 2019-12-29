import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { observer } from 'mobx-react';

@observer
class Summary extends React.Component {

render() {
  let { problem_units, summary, database, converted_units, resetState} = this.props.AppStore;

  return (
  <div className='container'>
    <div className='summary-container'>
      <h3>Wynik porównania baz danych:</h3>
      <table className="summary_table">
        <thead>
          <tr>
            <th>Jednostka urbanistyczna</th>
            <th>Liczba rekordów</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(item =>
          <tr key={item.id}>
            <td> {item.id}</td>
            <td>  {item.count}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <div >
      <div className='summary_text'>
        <h3 className='records_no'>Liczba wczytanych rekordów: {database.length}.</h3>
        <h3 className='matched'>Liczba przypisanych rekordów: {database.length - problem_units.length}.</h3>
        <h3 className='no-matched'>Liczba nieprzypisanych rekordów: {problem_units.length}.</h3>
        <h3 className='score'>Skuteczność przypisania: {(100-(100*problem_units.length/database.length)).toFixed(2)}%.</h3>
      </div>
      <div className='upload_links'>
        <CSVLink data={summary} filename={"wynik_porownania.csv"}><button className='upload_button'>Pobierz wynik porównania</button></CSVLink><br/>
        <CSVLink data={problem_units} filename={"rekordy_nieprzypisane_do_jednostek.csv"}><button className='upload_button'>Pobierz listę nieprzypisanych rekordów do jednostek</button></CSVLink><br/>
        <CSVLink data={converted_units} filename={"skonwertowana_baza_jednostek.csv"}><button className='upload_button'>Pobierz skonwertowaną bazę jednostek</button> </CSVLink>
      </div>
      <div className='reset'>
        <button onClick={resetState} className='button_reset button'>Porównaj ponownie</button>
      </div>
    </div>
  </div>
)}
}
export default Summary;