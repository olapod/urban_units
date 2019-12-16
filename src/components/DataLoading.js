import React from "react";
import CSVReader from 'react-csv-reader';
import { useObserver } from "mobx-react";
import StoreContext from '../stores/StoreContext';

const DataLoading = () => {
     const store = React.useContext(StoreContext);
  // const [urban_units,  database] = React.useState([]);

  return useObserver(() =>
    <div className='DataLoadingContainer'>
      <div className='csv_title'>
        <h4>Wgranie plików do porównania</h4>
        <p>W celu uzyskania polskich znaków pliki powinny być kodowane w formacie UTF-8</p>
      </div>
        <div className='container'>
          <div className='csv'>
            <CSVReader
              label="Wybierz plik CSV z bazą jednostek urbanistycznych"
              onFileLoaded={store.loadUrbanUnits}
              inputStyle={{ color: 'red' }}
              parserOptions={{header: true}}
              cssClass="csv-reader-input"
              cssInputClass='csv-input'
              inputId='file'
            />
           <h4>Plik dostarcza Wydział RG.</h4>
          </div>
          <div className='csv'>
            <CSVReader
              label="Wybierz plik CSV z bazą danych do porównania "
              onFileLoaded={store.loadDatabase}
              inputStyle={{color: 'red'}}
              parserOptions={{header: true}}
              cssClass="csv-reader-input"
              cssInputClass='csv-input'
            />
            <h4>Plik powinien zawierać kolumnę o nazwię "ulica" oraz kolumnę o nazwie "numer".</h4>
            <h4>Ulice powinny mieć nazwę dokładnie taką samą jak w bazie jednostek urbanistycznych!!!</h4>
            <h4>Wielkość liter nie ma znaczenia.</h4>
          </div>
        </div>
      </div>
    )

};

export default DataLoading;