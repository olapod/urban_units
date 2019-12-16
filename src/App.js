import React from "react";
import ReactDOM from "react-dom";
import { useLocalStore, useObserver } from "mobx-react";
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import StoreProvider from './stores/StoreProvider';
import StoreContext from './stores/StoreContext';
import DataLoading from './components/DataLoading';
import Summary from './components/Summary';
import CompareButton from './components/CompareButton';
import Spinner from './components/Spinner';

import './App.scss';

function App() {
  const store = React.useContext(StoreContext);
  console.log('Test: ', store)
  let display

    if (store.loading) {
      display = <Spinner />
      };
    if(!store.database.length || !store.urban_units.length) {
      display =<DataLoading loadDatabase={store.loadDatabase} loadUrbanUnits={store.loadUrbanUnits}/>
     };
    if(store.database.length && store.urban_units.length && !store.summary.length) {
      display = <CompareButton getSummary={store.getSummary}/>
      };
    if(store.summary.length) {
     display = <div className='DataLoadingContainer'>
          <Summary summary={store.summary} problem_units={store.problem_units} database={store.database} converted_units={store.converted_units} action={store.resetHandler}/>
        </div>
    };

    return useObserver(() =>(
      <StoreProvider>
        <h1 className='title'>Program do przypisywania jednostek urbanistycznych do punktów adresowych</h1>
        { display }
        <footer>
          <p>Copyright Aleksandra Podsiadlik 2019</p>
        </footer>
      </StoreProvider>
    ))
};


ReactDOM.render(<App />, document.getElementById('app'))