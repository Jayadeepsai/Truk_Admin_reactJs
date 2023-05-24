import React from "react"
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ActiveLoads from "./Components/ActiveLoads";
import Users from "./Components/Users";
import CompletedLoads from "./Components/CompletedLoads";
import Header from "./Components/Header";
import Vehicle from "./Components/Vehicle";
import MySidenav from "./Components/MySidenav";
import Refferals from "./Components/Refferals";
import Dates from "./Components/Dates";


export default function App() {

  return (
    <Router>
      <Header />
      {/* <Sidebar /> */}
      {/* <MySidenav /> */}
     
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/activeloads" element={<ActiveLoads />} />
        <Route path="/completedloads" element={<CompletedLoads />} />
        <Route path="/users" element={<Users />} />
        <Route path="/refferals" element={<Refferals />} />
        <Route path="/vehicles" element={<Vehicle />} />
        <Route path="/MySidenav" element={<MySidenav />} />
        {/* <Route path="/date" element={<Dates />} /> */}
      </Routes>

    </Router>
  );
}

