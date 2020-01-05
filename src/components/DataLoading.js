import React from "react";
import CSVReader from 'react-csv-reader';
import { observer } from 'mobx-react';
import DataUploadingUnits from './DataUploadingUnits';
import DataUploadingDatabase from './DataUploadingDatabase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

@observer
class DataLoading extends React.Component {

  renderDatabase() {

    if (!this.props.AppStore.database.length) {
      return (
        <DataUploadingDatabase />
      )};
    if (this.props.AppStore.database.length) {
        return (
          <div>
          <CheckCircleIcon style={{ fill: 'green', fontSize: 80 }}/>
          <p>Plik z bazą wgrano poprawnie.</p>
          </div>
        )};
       }

  renderUnits() {

    if (!this.props.AppStore.urban_units.length) {
      return (
         <DataUploadingUnits />
      )};
    if (this.props.AppStore.urban_units.length) {
        return (
          <div>
          <CheckCircleIcon style={{ fill: 'green', fontSize: 80 }}/>
          <p>Plik z jednostkami wgrano poprawnie.</p>
          </div>
        )};


  }

  render() {
  return (
    <div className='DataLoadingContainer'>
      <div className='csv_title'>
        <h3>Wgranie plików do porównania</h3>
        <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      </div>

        <div className='container'>
        { this.renderUnits() }
        { this.renderDatabase() }

        </div>
      </div>
    )};
};

export default DataLoading;