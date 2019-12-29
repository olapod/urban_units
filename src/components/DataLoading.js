import React from "react";
import CSVReader from 'react-csv-reader';
import { observer } from 'mobx-react';

@observer
class DataLoading extends React.Component {
  render() {
  return (
    <div className='DataLoadingContainer'>
      <div className='csv_title'>
        <h4>Wgranie plików do porównania</h4>
        <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      </div>
        <div className='container'>
          <div className='csv'>
            <CSVReader
              label="Wybierz plik CSV z bazą jednostek urbanistycznych"
              onFileLoaded={this.props.AppStore.loadUrbanUnits.bind(this)}
              inputStyle={{ color: 'red' }}
              parserOptions={{header: true}}
              cssClass="csv-reader-input"
              cssInputClass='csv-input'
              inputId='file'
              onError={this.props.AppStore.errorHandle.bind(this)}
            />
           <h4>Plik dostarcza Wydział RG.</h4>
          </div>
          <div className='csv'>
            <CSVReader
              label="Wybierz plik CSV z bazą danych do porównania "
              onFileLoaded={this.props.AppStore.loadDatabase.bind(this)}
              inputStyle={{color: 'red'}}
              parserOptions={{header: true}}
              cssClass="csv-reader-input"
              cssInputClass='csv-input'
              onError={this.props.AppStore.errorHandle.bind(this)}
            />
            <h4>Plik powinien zawierać kolumnę o nazwię "ulica" oraz kolumnę o nazwie "numer".</h4>
            <h4>Ulice powinny mieć nazwę dokładnie taką samą jak w bazie jednostek urbanistycznych!!!</h4>
            <h4>Wielkość liter nie ma znaczenia.</h4>
          </div>
        </div>
      </div>
    )};
};

export default DataLoading;