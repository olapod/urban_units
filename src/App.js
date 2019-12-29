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

  renderData() {

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