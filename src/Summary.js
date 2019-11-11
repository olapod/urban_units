import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

function Summary (props) {

            return (
          <div>
            <h3>Wynik porównania baz danych:</h3>
            <ul>{props.summary.map(item => <li key={item.id}>Jednostka urbanistyczna: {item.id} Liczba rekordów: {item.count}</li>)}
            </ul>
            <CSVLink data={props.summary} filename={"wynik_porownania.csv"}> Pobierz wynik porównania</CSVLink><br/>
            <CSVLink data={props.problem_units} filename={"rekordy_nieprzypisane_do_jednostek.csv"}> Pobierz listę nieprzypisanych rekordów do jednostek</CSVLink>
          </div>
        )


  }

  export default Summary;