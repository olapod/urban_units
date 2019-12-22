import React from "react";
import { observer } from 'mobx-react';
@observer
class CompareButton extends React.Component {

  onClick() {
    this.props.getSummary()
  }
  render() {
    return (
      <div className='DataLoadingContainer compare'>
        <p className="compare_text">Pliki do porównania zostały wgrane.</p>
        <div className='button_div'>
          <button onClick={this.onClick.bind(this)} className='button_compare button'>Porównaj oba pliki</button>
        </div>
      </div>
  )};
};
export default CompareButton;