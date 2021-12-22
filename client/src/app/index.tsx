import { history } from "helpers/history";
import React from "react";
import { Router } from "react-router-dom";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <Router history={history}>
      <div>
        <Routes />
      </div>
    </Router>
  );
};

export default App;
