import React from "react";
import ReactDOM from "react-dom";
import DataLoading from './DataLoading';
import Summary from './Summary';
import CompareButton from './CompareButton';
import Spinner from './Spinner'
import convert_urban_units from './UnitsContainer';
import compare_databases from './DatabaseContainer';
import get_summary from './SummaryContainer';
import get_problem_units from './ProblemUnitsContainer';
import './App.scss';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {urban_units: [], database: [], summary: [], problem_units: [], loading: false, converted_units: [], compared_database: []};
    this.initialState = { ...this.state }
    this.resetHandler = this.resetHandler.bind(this);
    this.getSummary = this.getSummary.bind(this);
    }

loadUrbanUnits = units => {

this.setState({
  urban_units: units,
})
  this.convertUnits()
};

loadDatabase = data => {

  this.setState({ database: data });
};

convertUnits() {
  this.setState({
    converted_units: convert_urban_units(this.state.urban_units)
  })
}

getDataBase() {
  this.setState({
  compared_database: compare_databases(this.state.database, this.state.converted_units)
})
};

getProblemUnits() {
  this.setState({
  problem_units: get_problem_units(this.state.compared_database)
  });
  };

getSummary () {
  this.setState({ loading: true });
  setTimeout(() => {
    this.getDataBase();
    this.setState({
      loading: false,
      summary: get_summary(this.state.compared_database)
    })
    this.getProblemUnits();
  }, 0)

};

resetHandler() {
  this.setState(this.initialState);
  };

renderData() {
  if (this.state.loading) {
    return (
      <Spinner />
    )};
  if(!this.state.database.length || !this.state.urban_units.length) {
    return (
      <DataLoading loadDatabase={this.loadDatabase} loadUrbanUnits={this.loadUrbanUnits}/>
      )};
  if(this.state.database.length && this.state.urban_units.length && !this.state.summary.length) {
    return (
      <CompareButton getSummary={this.getSummary}/>
    )};
  if(this.state.summary.length) {
    return (
      <div className='DataLoadingContainer'>
        <Summary summary={this.state.summary} problem_units={this.state.problem_units} database={this.state.database} converted_units={this.state.converted_units} action={this.resetHandler}/>
      </div>
    )}
}

render() {
    return (
      <div >
        <h1 className='title'>Program do przypisywania jednostek urbanistycznych do punktów adresowych</h1>
        { this.renderData() }
        <footer>
          <p>Copyright Aleksandra Podsiadlik 2019</p>
        </footer>
      </div>
    );
};
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));
