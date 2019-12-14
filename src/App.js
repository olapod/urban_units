import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import { observer, inject } from 'mobx-react'
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
  if (this.props.AppStore.loading) {
    return (
      <Spinner />
    )};
  if(!this.props.AppStore.database.length || !this.props.AppStore.urban_units.length) {
    return (
      <DataLoading loadDatabase={this.props.AppStore.loadDatabase} loadUrbanUnits={this.props.AppStore.loadUrbanUnits}/>
      )};
  if(this.props.AppStore.database.length && this.props.AppStore.urban_units.length && !this.props.AppStore.summary.length) {
    console.log('Test: ', this.props.AppStore.converted_units)
    return (
      <CompareButton getSummary={this.props.AppStore.getSummary}/>
    )};
  if(this.props.AppStore.summary.length) {
    return (
      <div className='DataLoadingContainer'>
        <Summary summary={this.props.AppStore.summary} problem_units={this.props.AppStore.problem_units} database={this.props.AppStore.database} converted_units={this.props.AppStore.converted_units} action={this.props.AppStore.resetHandler}/>
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

ReactDOM.render(<Provider AppStore={new AppStore()}><App /></Provider>, document.getElementById('app'))