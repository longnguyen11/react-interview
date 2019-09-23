import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Location from './routes/Location.js';
import Earthquake from './routes/Earthquake.js';
import LoanPayments from './routes/LoanPayments.js';


function App() {
  return (
    <Router>
      <div class="topnav" id="myTopnav">
        <ul>
          <li>
            <Link to="/">Location</Link>
          </li>
          <li>
            <Link to="/Earthquake">Earthquake</Link>
          </li>
          <li>
            <Link to="/Loan">LoanPayments</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Location} />
        <Route path="/Earthquake" component={Earthquake} />
        <Route path="/Loan" component={LoanPayments} />
      </div>
    </Router>
  );
}

export default App;
