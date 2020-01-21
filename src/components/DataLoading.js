import React from "react";

import { observer } from 'mobx-react';
import DataUploadingUnits from './DataUploadingUnits';
import DataUploadingDatabase from './DataUploadingDatabase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';

@observer
class DataLoading extends React.Component {

  renderDatabase() {

    if (!this.props.appStore.database.length) {
      return (
        <div className='button_container'>
        <DataUploadingDatabase />
        </div>
      )};
    if (this.props.appStore.database.length) {
        return (
          <div className='button_container'>
          <CheckCircleIcon style={{ fill: 'green', fontSize: 80 }}/>
          <p>Plik z bazą wgrano poprawnie.</p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          </div>
        )};
       }

  renderUnits() {

    if (!this.props.appStore.urban_units.length) {
      return (
        <div className='button_container'>
         <DataUploadingUnits />
         </div>
      )};
    if (this.props.appStore.urban_units.length) {
        return (
          <div className='button_container'>
          <CheckCircleIcon style={{ fill: 'green', fontSize: 80 }}/>
          <p>Plik z jednostkami wgrano poprawnie.</p>
          </div>
        )};


  }

  render() {
    const isEnabled = this.props.appStore.urban_units.length > 0 && this.props.appStore.database.length > 0;
  return (
    <div className='data_loading'>
      <div className='csv_title'>
        <h3>Wgranie plików do porównania</h3>
        <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      </div>

        <div className='container'>
        { this.renderUnits() }
        { this.renderDatabase() }
        <div>

        </div>
        </div>
        <div className='button_container'>
        <Button variant="contained" disabled={!isEnabled} color='primary'onClick={this.props.appStore.getAll}>
          Porównaj bazy
        </Button>
        </div>
      </div>
    )};
};

export default DataLoading;