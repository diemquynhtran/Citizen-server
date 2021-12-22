import { history } from "helpers/history";
import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <Router history={history}>
      <div>
        <Routes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
