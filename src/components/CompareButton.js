import React from "react";
import { useObserver } from "mobx-react";
import StoreContext from '../stores/StoreContext';
// import { Provider } from 'mobx-react';
// import { observer, inject } from 'mobx-react';

// @inject('CompareStore')
// @observer
const CompareButton = () => {

  const store = React.useContext(StoreContext);
    return useObserver(() =>
      <div className='DataLoadingContainer compare'>
        <p className="compare_text">Pliki do porównania zostały wgrane.</p>
        <div className='button_div'>
          <button onClick={store.getSummary} className='button_compare button'>Porównaj oba pliki</button>
        </div>
      </div>
  )};

export default CompareButton;