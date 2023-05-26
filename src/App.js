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
import PrivateRoutes from "./Components/PrivateRoutes";
import LoginForm from "./Components/LoginForm";
import HideTopNav from "./Components/HideTopNav/HideTopNav";


export default function App() {

  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

   //when we are in the login page due to taking false ,
  //we given by a different page path page is not route
  //incase of we take true page is routed

  return (
    <Router>
      <HideTopNav> <Header /></HideTopNav>
      {/* <Sidebar /> */}
      {/* <MySidenav /> */}

      <Routes>
        <Route path="/" element={<PrivateRoutes Component={Home} />} />
        <Route path="/activeloads" element={<PrivateRoutes Component={ActiveLoads} />} />
        <Route path="/completedloads" element={<PrivateRoutes Component={CompletedLoads} />} />
        <Route path="/users" element={<PrivateRoutes Component={Users} />} />
        <Route path="/refferals" element={<PrivateRoutes Component={Refferals} />} />
        <Route path="/vehicles" element={<PrivateRoutes Component={Vehicle} />} />
        {/* <Route path="/MySidenav" element={<PrivateRoutes Component={Vehicle}/>} /> */}
        {/* <Route path="/date" element={<Dates />} /> */}
        {/* </Route> */}
        <Route path='/login' element={<LoginForm />} />
      </Routes>

    </Router>
  );
}

