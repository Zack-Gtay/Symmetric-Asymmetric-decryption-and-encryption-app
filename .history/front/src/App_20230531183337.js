import React, { useEffect, useState } from "react";
import Rsa from "./components/Rsa";
import Ecc from "./components/Ecc";
import Aes from "./components/Aes";
import { BrowserRouter as Router, Rout, Route, Link } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/rsa" element={<Rsa />} />
        <Route path="/ecc" element={<Ecc />} />
        <Route path="/aes" element={<Aes />} />
      </Routes>
      <ul>
        <li>
          <Link to="/rsa">RSA</Link>
        </li>
        <li>
          <Link to="/ecc">ECC</Link>
        </li>
        <li>
          <Link to="/aes">AES</Link>
        </li>
      </ul>
      
    </div>
  );
};

export default App;
