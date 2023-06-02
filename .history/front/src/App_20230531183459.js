import React, { useEffect, useState } from "react";
import Rsa from "./components/Rsa";
import Ecc from "./components/Ecc";
import Aes from "./components/Aes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/rsa" element={<Rsa />} />
        <Route path="/ecc" element={<Ecc />} />
        <Route path="/aes" element={<Aes />} />
      </Routes>
      
    </Router>
  );
};

export default App;
