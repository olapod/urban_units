import React from "react";
import { useObserver } from "mobx-react";
import StoreContext from '../stores/StoreContext';
import { CSVLink, CSVDownload } from "react-csv";

const Summary = () => {

  const store = React.useContext(StoreContext);
    return useObserver(() =>

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
          {store.summary.map(item =>
          <tr key={item.id}>
            <td> {item.id}</td>
            <td>  {item.count}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <div >
      <div className='summary_text'>
        <h3 className='records_no'>Liczba wczytanych rekordów: {store.database.length}.</h3>
        <h3 className='matched'>Liczba przypisanych rekordów: {store.database.length - store.problem_units.length}.</h3>
        <h3 className='no-matched'>Liczba nieprzypisanych rekordów: {store.problem_units.length}.</h3>
        <h3 className='score'>Skuteczność przypisania: {(100-(100*store.problem_units.length/store.database.length)).toFixed(2)}%.</h3>
      </div>
      <div className='upload_links'>
        <CSVLink data={store.summary} filename={"wynik_porownania.csv"}><button className='upload_button'>Pobierz wynik porównania</button></CSVLink><br/>
        <CSVLink data={store.problem_units} filename={"rekordy_nieprzypisane_do_jednostek.csv"}><button className='upload_button'>Pobierz listę nieprzypisanych rekordów do jednostek</button></CSVLink><br/>
        <CSVLink data={store.converted_units} filename={"skonwertowana_baza_jednostek.csv"}><button className='upload_button'>Pobierz skonwertowaną bazę jednostek</button> </CSVLink>
      </div>
      <div className='reset'>
        <button onClick={store.resetHandler} className='button_reset button'>Porównaj ponownie</button>
      </div>
    </div>
  </div>
)}

export default Summary;