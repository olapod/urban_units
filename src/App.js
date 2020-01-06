import React from "react";
import ReactDOM from "react-dom";
import { observer, Provider } from 'mobx-react';
import AppStore from './stores/AppStore';
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

    if (AppStore.loading) {
      return (
        <Spinner AppStore={AppStore}/>
      )};
    if (AppStore.error || (AppStore.database.length && (!AppStore.database[0].hasOwnProperty('ulica') || !AppStore.database[0].hasOwnProperty('numer'))) || (AppStore.urban_units.length && (!AppStore.urban_units[0].hasOwnProperty('ULICA') || !AppStore.urban_units[0].hasOwnProperty('JEDNOSTKA_URBANISTYCZNA')))) {
      return (
         <Error AppStore={AppStore}/>
      )};
    if(!AppStore.loading && !AppStore.summary.length) {
      return (
        <DataLoading AppStore={AppStore}/>
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
  <App/>, document.getElementById('app')
);