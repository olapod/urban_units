import React from "react";
import CSVReader from 'react-csv-reader';
import { observer, inject } from 'mobx-react';
import appStore from '../stores/appStore';

import Button from '@material-ui/core/Button';

@inject("appStore")
@observer
class DataUploadingUnits extends React.Component {
  render() {
  return (
        <div className='csv'>
            <CSVReader
            //   label="Wybierz plik CSV z bazą jednostek urbanistycznych"
              onFileLoaded={this.props.appStore.loadUrbanUnits.bind(this)}
              inputStyle={{ opacity: 0, width: '170px', marginLeft: '-170px' }}
              parserOptions={{header: true}}
              cssClass="csv-reader-input"
              cssInputClass='csv-input'
              inputId='contained-button-file'
              onError={this.props.appStore.errorHandle.bind(this)}
            />


            <label className="custom-file-upload" htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" size="large">

            Wgraj plik .CSV
            </Button>
            </label>

           <p>Wgraj plik .CSV z bazą jednostek urbanistycznych. Plik dostarcza Wydział RG.</p>
          </div>

    )};
};

export default DataUploadingUnits;