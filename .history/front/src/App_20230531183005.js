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
        <Route path="/" element={<Rsa />} />
        <Route path="/about" element={<Ecc />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Rsa />
      <Ecc />
      <Aes />
    </div>
  );
};

export default App;
