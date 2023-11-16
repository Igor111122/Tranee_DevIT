import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from './components/Routers';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const devMode = process.env.NODE_ENV === 'development'
if(devMode && module && module.hot){
    module.hot.accept();
}