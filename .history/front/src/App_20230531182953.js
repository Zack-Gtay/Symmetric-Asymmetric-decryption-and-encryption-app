import React, { useEffect, useState } from "react";
import Axios from "axios";
import Rsa from './components/Rsa';
import Ecc from './components/Ecc';
import Aes from './components/Aes';
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
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
      <Rsa />
      <Ecc/>
      <Aes/>
      
    </div>
    
  );
};

export default App;
