import Axios from "axios";
import React, { useState } from "react";

const Des = () => {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [key, setKey] = useState("");

  const handleEncrypt = () => {
    Axios.post("http://localhost:5000/encrypt-des", { plaintext, key })
      .then((response) => {
        setCiphertext(response.data.ciphertext);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDecrypt = () => {
    Axios.post("http://localhost:5000/decrypt-des", { ciphertext, key })
      .then((response) => {
        setDecryptedText(response.data.decryptedText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center text-center mt-5 gap-2 ">
      <h1>Encrypt and Decrypt with DES</h1>
      <label>Plaintext:</label>
      <input
        placeholder="Enter data to encrypt"
        className="w-[30%] text-center self-center text-black drop-shadow-md outline-0 rounded-md p-3"
        type="text"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
      <button onClick={handleEncrypt}>Encrypt</button>
      <label>Ciphertext:</label>
      <input type="text" value={ciphertext} readOnly />
      <button onClick={handleDecrypt}>Decrypt</button>
      <label>Decrypted Text:</label>
      <input type="text" value={decryptedText} readOnly />
    </div>
  );
};

export default Des;
