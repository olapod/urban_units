import React from "react";
import ReactDOM from "react-dom";
import summary from './AppContainer';


const App = () => {

       return (
    <div>
      <p>React here!</p>
      <ul>
      {summary.map(item => <li key={item.id}>jednostka urbanistyczna: {item.id} Ilość rekordów: {item.count}</li>)}
             </ul>
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));
