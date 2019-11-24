import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

class Summary extends React.Component {

  render() {
    let { loading, problem_units, summary } = this.props;
if (loading) {
  return (
    <div>
     <span>wczytuje dane</span>
    </div>
  );
}
if (!loading && summary.length>0) {
            return (
          <div>
            <h3>Wynik porównania baz danych:</h3>
            <ul>{summary.map(item => <li key={item.id}>Jednostka urbanistyczna: {item.id} Liczba rekordów: {item.count}</li>)}
            </ul>
            <CSVLink data={summary} filename={"wynik_porownania.csv"}> Pobierz wynik porównania</CSVLink><br/>
            <CSVLink data={problem_units} filename={"rekordy_nieprzypisane_do_jednostek.csv"}> Pobierz listę nieprzypisanych rekordów do jednostek</CSVLink>
          </div>
        )
   }
else return null
  }
  }

  export default Summary;