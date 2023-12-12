import React from "react";
import GlobalStyled from "./globalStyles/globalStyled";
import { Router } from "react-router-dom";
import Header from "./components/headerr";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, {persistor} from "./store";
import customhistory from './services/history';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router history={customhistory}>
        <Header/>
        <Routes/>
        <ToastContainer autoClose={1000}/>
        <GlobalStyled/>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
