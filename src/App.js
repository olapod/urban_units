import React from "react";
import ReactDOM from "react-dom";
import { inject, observer } from 'mobx-react';
import AppStore from './stores/AppStore';
import DataLoading from './components/DataLoading';
import Summary from './components/Summary';
import CompareButton from './components/CompareButton';
import Spinner from './components/Spinner'

import './App.scss';
@inject('AppStore')
@observer
class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.resetHandler = this.resetHandler.bind(this);
  //   this.getSummary = this.getSummary.bind(this);
  // }

renderData() {
  var AppStore = this.props.AppStore;
  if (AppStore.loading) {
    return (
      <Spinner />
    )};
  if(!AppStore.database.length || !AppStore.urban_units.length) {
    return (
      <DataLoading loadDatabase={AppStore.loadDatabase} loadUrbanUnits={AppStore.loadUrbanUnits}/>
      )};
  if(AppStore.database.length && AppStore.urban_units.length && !AppStore.summary.length) {
    console.log('Test: ', AppStore.converted_units)
    return (
      <CompareButton getAll={AppStore.getAll}/>
    )};
  if(AppStore.summary.length) {
    return (
      <div className='DataLoadingContainer'>
        <Summary summary={AppStore.summary} problem_units={AppStore.problem_units} database={AppStore.database} converted_units={AppStore.converted_units} action={AppStore.resetHandler}/>
      </div>
    )}
}

render() {

  // console.log("Check: ", AppStore.converted_units.length)
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
  <App AppStore={AppStore} />,
  document.getElementById('app')
);