import React from "react";
class CompareButton extends React.Component {

// getSummary () {
//   this.getDataBase();
//   var summary = get_summary(this.state.database);
//   this.getProblemUnits();
//     return summary
// };

//   getSummary() {
//     this.getDataBase();
//     this.setState({
//       summary: get_summary(this.state.database),

//     })
//     this.getProblemUnits();
// }



render() {
    return (
      <div className='DataLoadingContainer compare'>
        <p className="compare_text">Pliki do porównania zostały wgrane.</p>
        <div className='button_div'>
          <button onClick={this.props.getSummary.bind(this)} className='button_compare button'>Porównaj oba pliki</button>
        </div>
      </div>
  )};
};
export default CompareButton;