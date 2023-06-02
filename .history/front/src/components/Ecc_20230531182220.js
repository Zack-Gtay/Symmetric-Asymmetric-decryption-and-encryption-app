import { Axios } from "axios";
import React, { useState } from "react";

const Ecc = () => {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [plaintext2, setPlaintext2] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedPlaintext, setDecryptedPlaintext] = useState("");

  const generateKeys = () => {
    Axios.post("http://localhost:5000/generate-keys")
      .then((response) => {
        setPublicKey(response.data.publicKey);
        setPrivateKey(response.data.privateKey);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEncrypt2 = () => {
    Axios.post("http://localhost:5000/encrypt-with-ecc", {
      plaintext: plaintext2,
    })
      .then((response) => {
        setCiphertext(response.data.ciphertext);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDecrypt2 = () => {
    setDecryptedPlaintext(plaintext2);
  };

  return (
    <div>
      <h1>ECC</h1>
      <button onClick={generateKeys}>Generate Keys</button>
      <br />
      Public Key: {publicKey}
      <br />
      Private Key: {privateKey}
      <br />
      <br />
      <input
        type="text"
        value={plaintext2}
        onChange={(e) => setPlaintext2(e.target.value)}
      />
      <button onClick={handleEncrypt2}>Encrypt</button>
      <br />
      Ciphertext: {ciphertext}
      <br />
      <button onClick={handleDecrypt2}>Decrypt</button>
      <br />
      Decrypted Plaintext: {decryptedPlaintext}
    </div>
  );
};

export default Ecc;
