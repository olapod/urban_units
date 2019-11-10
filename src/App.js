import React from "react";
import ReactDOM from "react-dom";

import DataLoadingContainer from './DataLoadingContainer';

class App extends React.Component {


render() {
       return (
    <div>
      <h1>Program do przypisywania jednostek urbanistycznych do punktów adresowych</h1>
      <DataLoadingContainer/>

    </div>
  );
       }
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));
