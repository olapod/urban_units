import React from "react";
import ReactDOM from "react-dom";
import { observer, Provider } from 'mobx-react';
import appStore from './stores/appStore';
import AppTitle from './components/AppTitle'
import DataLoading from './components/DataLoading';
import Summary from './components/Summary';
import Spinner from './components/Spinner';
import Error from './components/Error';
import Container from '@material-ui/core/Container';

import './fonts/index.scss';
import './App.scss';

@observer

class App extends React.Component {

  renderData() {

    if (appStore.loading) {
      return (
        <Spinner appStore={appStore}/>
      )};
    if (appStore.error || (appStore.database.length && (!appStore.database[0].hasOwnProperty('ulica') || !appStore.database[0].hasOwnProperty('numer'))) || (appStore.urban_units.length && (!appStore.urban_units[0].hasOwnProperty('ULICA') || !appStore.urban_units[0].hasOwnProperty('JEDNOSTKA_URBANISTYCZNA')))) {
      return (
         <Error appStore={appStore}/>
      )};
    if(!appStore.loading && !appStore.summary.length) {
      return (
        <DataLoading appStore={appStore}/>
        )};
    if(appStore.summary.length) {
      return (
        <div className='DataLoadingContainer'>
          <Summary appStore={appStore}/>
        </div>
      )}
  }

  render() {
      return (
        <Provider appStore={appStore}
        tableStore={appStore.tableStore}
        >
        <Container  maxWidth='lg'>
        <AppTitle />
          { this.renderData() }
          <footer>
            <p>Copyright Aleksandra Podsiadlik 2019</p>
          </footer>
        </Container>
        </Provider>
      );
  };
};

ReactDOM.render(
  <App/>, document.getElementById('app'))