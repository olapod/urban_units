import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

function Summary (props) {

            return (
          <div>
            <h3>Wynik porównania baz danych:</h3>
            <ul>{props.summary.map(item => <li key={item.id}>jednostka urbanistyczna: {item.id} Ilość rekordów: {item.count}</li>)}
            </ul>
            <CSVLink data={props.summary} filename={"wynik_porownania.csv"}> Pobierz wynik porównania</CSVLink>
          </div>
        )


  }

  export default Summary;