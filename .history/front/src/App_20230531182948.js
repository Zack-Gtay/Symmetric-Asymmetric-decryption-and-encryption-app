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
      <Rsa />
      <Ecc/>
      <Aes/>
      
    </div>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </BrowserRouter>
  );
};

export default App;
