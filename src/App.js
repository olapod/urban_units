import React from "react";
import ReactDOM from "react-dom";
import { observer } from 'mobx-react';
import AppStore from './stores/AppStore';
import DataLoading from './components/DataLoading';
import Summary from './components/Summary';
import CompareButton from './components/CompareButton';
import Spinner from './components/Spinner'

import './App.scss';

@observer

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.resetHandler = this.resetHandler.bind(this);
  //   this.getSummary = this.getSummary.bind(this);
  // }

renderData() {

  if (AppStore.loading) {
    return (
      <Spinner />
    )};
  if(!AppStore.database.length || !AppStore.urban_units.length) {
    return (
      <DataLoading AppStore={AppStore}/>
      )};
  if(AppStore.database.length && AppStore.urban_units.length && !AppStore.summary.length) {
    console.log('Test: ', AppStore.urban_units)
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
  <App/>, document.getElementById('app')
);