import React from "react";
import ReactDOM from "react-dom";
import { observer, Provider } from 'mobx-react';
import AppStore from './stores/AppStore';
import DataLoading from './components/DataLoading';
import Summary from './components/Summary';
import CompareButton from './components/CompareButton';
import Spinner from './components/Spinner';
import Error from './components/Error';
import './fonts/index.scss';
import './App.scss';

@observer

class App extends React.Component {

  renderData() {

    if (AppStore.loading) {
      return (
        <Spinner AppStore={AppStore}/>
      )};
    if (AppStore.error || (AppStore.database.length && (!AppStore.database[0].hasOwnProperty('ulica') || !AppStore.database[0].hasOwnProperty('numer'))) || (AppStore.urban_units.length && (!AppStore.urban_units[0].hasOwnProperty('ULICA') || !AppStore.urban_units[0].hasOwnProperty('JEDNOSTKA_URBANISTYCZNA')))) {
      return (
         <Error AppStore={AppStore}/>
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
        <Provider AppStore={AppStore}>
        <div >
          <h1 className='title'>Program do przypisywania jednostek urbanistycznych do punktów adresowych</h1>
          { this.renderData() }
          <footer>
            <p>Copyright Aleksandra Podsiadlik 2019</p>
          </footer>
        </div>
        </Provider>
      );
  };
};

ReactDOM.render(
  <App/>, document.getElementById('app')
);