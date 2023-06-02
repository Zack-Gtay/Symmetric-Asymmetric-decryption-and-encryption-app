import React, { useEffect, useState } from "react";
import Rsa from "./components/Rsa";
import Ecc from "./components/Ecc";
import Aes from "./components/Aes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <ul className="flex flex-row gap-5 text-center w-full  justify-center">
        <li>
          <Link to="/rsa">
            <button>RSA</button>
          </Link>
        </li>
        <li>
          <Link to="/ecc">
            <button>ECC</button>
          </Link>
        </li>
        <li>
          <Link to="/aes">
            <button>AES</button>
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/rsa" element={<Rsa />} />
        <Route path="/ecc" element={<Ecc />} />
        <Route path="/aes" element={<Aes />} />
      </Routes>
    </Router>
  );
};

export default App;
