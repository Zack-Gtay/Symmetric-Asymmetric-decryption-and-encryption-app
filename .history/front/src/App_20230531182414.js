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
      <div>
        <h1>AES Encryption and Decryption</h1>
        <div>
          <label>Plaintext:</label>
          <input
            type="text"
            value={plaintext3}
            onChange={handlePlaintextChange}
          />
          <button onClick={handleEncrypt3}>Encrypt</button>
        </div>
        <div>
          <label>Secret Key:</label>
          <input
            type="text"
            value={secretKey}
            onChange={handleSecretKeyChange}
          />
        </div>
        <div>
          <label>IV:</label>
          <input type="text" value={iv} onChange={handleIVChange} />
        </div>
        <div>
          <label>Encrypted Data:</label>
          <input
            type="text"
            value={encryptedData}
            onChange={handleEncryptedDataChange}
          />
          <button onClick={handleDecrypt3}>Decrypt</button>
        </div>
        <div>
          <label>Decrypted Data:</label>
          <input type="text" value={decryptedData} readOnly />
        </div>
      </div>
    </div>
  );
};

export default App;
