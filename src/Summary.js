import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

class Summary extends React.Component {

  render() {
    let { problem_units, summary, database, converted_units } = this.props;

  return (
          <div className='container'>
            <div>
              <h3>Wynik porównania baz danych:</h3>
              <ul>{summary.map(item => <li key={item.id}>Jednostka urbanistyczna: {item.id} Liczba rekordów: {item.count}</li>)}
              </ul>
            </div>
            <div className='summary_text'>
              <ul>Liczba wszystkich rekordów: {database.length}. W tym:
                <li>liczba przypisanych rekordów: {database.length - problem_units.length}</li>
                <li>liczba nieprzypisanych rekordów: {problem_units.length}</li>
              </ul>
              <p>Skuteczność przypisania: {(100-(100*problem_units.length/database.length)).toFixed(2)}%</p>
              <CSVLink data={summary} filename={"wynik_porownania.csv"}> Pobierz wynik porównania</CSVLink><br/>
              <CSVLink data={problem_units} filename={"rekordy_nieprzypisane_do_jednostek.csv"}> Pobierz listę nieprzypisanych rekordów do jednostek</CSVLink><br/>
              <CSVLink data={converted_units} filename={"skonwertowana_baza_jednostek.csv"}> Pobierz skonwertowaną bazę jednostek</CSVLink>
            </div>
          </div>
        )

  }
}

  export default Summary;