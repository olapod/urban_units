import React from "react";
import ReactDOM from "react-dom";
import { observer } from 'mobx-react';
import AppStore from './stores/AppStore';
import DataLoading from './components/DataLoading';
import Summary from './components/Summary';
import CompareButton from './components/CompareButton';
import Spinner from './components/Spinner';
import Error from './components/Error';

import './App.scss';

@observer

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

    if (AppStore.loading) {
      return (
        <Spinner AppStore={AppStore}/>
      )};
    if (AppStore.error) {
      return (
         <Error />
      )};
    if(!AppStore.loading && (!AppStore.database.length || !AppStore.urban_units.length)) {
      return (
        <DataLoading AppStore={AppStore}/>
        )};
    if(AppStore.database.length && AppStore.urban_units.length && !AppStore.summary.length) {
      return (
        <CompareButton AppStore={AppStore}/>
      )};
    if(AppStore.summary.length) {
      return (
        <div className='DataLoadingContainer'>
          <Summary AppStore={AppStore}/>
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

ReactDOM.render(
  <App/>, document.getElementById('app')
);