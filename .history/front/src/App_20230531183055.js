import React, { useEffect, useState } from "react";
import Axios from "axios";
import Rsa from "./components/Rsa";
import Ecc from "./components/Ecc";
import Aes from "./components/Aes";
const App = () => {
  //RSA
  //ECC

  // AES

  // RSA

  // ECC

  // AES

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
          <Link to="/contact">AES</Link>
        </li>
      </ul>
      <Rsa />
      <Ecc />
      <Aes />
    </div>
  );
};

export default App;
