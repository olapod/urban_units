import React from "react";
import ReactDOM from "react-dom";
import DataLoadingContainer from './DataLoadingContainer';
import './App.scss';


class App extends React.Component {

render() {
       return (
    <div >
      <h1 className='title'>Program do przypisywania jednostek urbanistycznych do punktów adresowych</h1>
      <DataLoadingContainer/>
      <footer>
        <p>Copyright Aleksandra Podsiadlik 2019</p>
      </footer>
    </div>
  );
       }
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));
