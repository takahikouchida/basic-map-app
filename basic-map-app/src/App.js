import './App.css';

import Dashboard from "./components/Dashboard";
import React from "react";

function App() {
    const [map,setMap] = React.useState(null);

  return (
    <div className="App">
        <Dashboard map={map} setMap={setMap} />
    </div>
  );
}

export default App;
