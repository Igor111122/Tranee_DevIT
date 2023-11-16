import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import App from './App';
import JoinGame from './JoinGame';

export default function BasicExample() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<JoinGame/>} />
            <Route path='/about' element={<App/>} />
        </Routes>
    </Router>
  );
}