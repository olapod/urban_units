import React from "react";
import { CSVLink } from "react-csv";
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import SummaryTable from './SummaryTable';

@observer
class Summary extends React.Component {

render() {
  let { problem_units, summary, database, converted_units, resetState} = this.props.AppStore;

  return (
  <div className='container'>
    <div className='summary-container'>
      <h4 className='table-title'>Wynik porównania baz danych:</h4>
      <SummaryTable AppStore={AppStore}/>
    </div>
    <div >
      <div className='summary_text'>
        <h4>Podsumowanie porównania:</h4>
        <p className='records_no'>Liczba wczytanych rekordów: {database.length}.</p>
        <p className='matched'>Liczba przypisanych rekordów: {database.length - problem_units.length}.</p>
        <p className='no-matched'>Liczba nieprzypisanych rekordów: {problem_units.length}.</p>
        <p className='score'>Skuteczność przypisania: {(100-(100*problem_units.length/database.length)).toFixed(2)}%.</p>
      </div>
      <div className='upload_links'>
        <CSVLink  data={summary} filename={"wynik_porownania.csv"}><Button className='link_1' variant="contained" color="secondary" component="span" size="large">Pobierz wynik porównania</Button></CSVLink><br/>
        <CSVLink  data={problem_units} filename={"rekordy_nieprzypisane_do_jednostek.csv"}><Button className='link_2' variant="contained" color="secondary" component="span" size="large">Pobierz listę nieprzypisanych rekordów do jednostek</Button></CSVLink><br/>
        <CSVLink  data={converted_units} filename={"skonwertowana_baza_jednostek.csv"}><Button className='link_3' variant="contained" color="secondary" component="span" size="large">Pobierz skonwertowaną bazę jednostek</Button> </CSVLink>
      </div>
      <div className='reset'>
        <Button className='reset_button' onClick={resetState} variant="contained" color="primary" component="span" size="large">Porównaj ponownie</Button>
      </div>
    </div>
  </div>
)}
}
export default Summary;