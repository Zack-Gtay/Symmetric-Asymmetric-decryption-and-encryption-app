import Axios from "axios";
import React, { useState } from "react";

const Aes = () => {
  const [plaintext3, setPlaintext3] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [iv, setIV] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const handleEncrypt3 = () => {
    Axios.post("http://localhost:5000/encrypt-with-aes", {
      plaintext: plaintext3,
    })
      .then((response) => {
        setSecretKey(response.data.secretKey);
        setIV(response.data.iv);
        setEncryptedData(response.data.encryptedData);
        console.log(encryptedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDecrypt3 = () => {
    Axios.post("http://localhost:5000/decrypt-with-aes", {
      secretKey: secretKey,
      iv: iv,
      encryptedData: encryptedData,
    })
      .then((response) => {
        setDecryptedData(response.data.decryptedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlaintextChange = (event) => {
    setPlaintext3(event.target.value);
  };

  const handleSecretKeyChange = (event) => {
    setSecretKey(event.target.value);
  };

  const handleIVChange = (event) => {
    setIV(event.target.value);
  };

  const handleEncryptedDataChange = (event) => {
    setEncryptedData(event.target.value);
  };
  return (
    <div className="flex flex-col w-full justify-center text-center mt-5 gap-2 ">
      <h1>Encrypt and Decrypt with AES </h1>
        <label>Plaintext:</label>
        <input
          type="text"
          value={plaintext3}
          onChange={handlePlaintextChange}
        />
        className="bg-gray-500 w-[30%] hover:drop-shadow-md self-center mt-2 p-3 rounded-md text-white"
        <button  onClick={handleEncrypt3}>Encrypt</button>
        <label>Secret Key:</label>
        <input type="text" value={secretKey} onChange={handleSecretKeyChange} />
        <label>IV:</label>
        <input type="text" value={iv} onChange={handleIVChange} />
        <label>Encrypted Data:</label>
        <input
          type="text"
          value={encryptedData}
          onChange={handleEncryptedDataChange}
        />
        <button onClick={handleDecrypt3}>Decrypt</button>
        <label>Decrypted Data:</label>
        <input type="text" value={decryptedData} readOnly />
    </div>
  );
};

export default Aes;
