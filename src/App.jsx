import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import LandingPage from "./stores/pages/LandingPage";
import Admin from "./stores/components/Admin";
import MobilePage from "./stores/pages/MobilePage";
import CompPage from "./stores/pages/CompPage";
import AcPage from "./stores/pages/AcPage";
import MobileSingle from "./stores/singles/MobileSingle";
import UserCart from "./stores/UserCart";
import FridgePage from "./stores/pages/FridgePage";
import TvPage from "./stores/pages/TvPage";
import ComputerSingle from "./stores/singles/ComputerSingle";
import AcSingle from "./stores/singles/AcSingle";
import TvSingle from "./stores/singles/TvSingle";
import FridgeSingle from "./stores/singles/FridgeSingle";
import LoginPage from "./stores/components/Login";
import Register from "./stores/components/Register";
import Forgot from "./stores/components/Forgot";
import EditPage from "./stores/components/Edit";
import Acbuy from "./stores/buy/Acbuy";
import Anav from "./stores/components/Anav";
import Acnow from "./stores/now/Acnow";
import Computernow from "./stores/now/Computernow";

const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/mobiles" element={<MobilePage />} />
        <Route path="/computers" element={<CompPage />} />
        <Route path="/fridge" element={<FridgePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/ac" element={<AcPage />} />
        <Route path="/mobiles/:id" element={<MobileSingle />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/acsingleS" element={<AcSingle />} />
        <Route path="/tv/:id" element={<TvSingle />} />
        <Route path="/computers/:id" element={<ComputerSingle />} />
        <Route path="/fridge/:id" element={<FridgeSingle />} />
        <Route path="/acbuy/:id" element={<Acbuy />} />
        <Route path="/Anav" element={<Anav />} />
        <Route path="/acnow" element={<Acnow />} />
        <Route path="/computernow" element={<Computernow />} />
      </Routes>
    </div>
  );
};

export default App;
