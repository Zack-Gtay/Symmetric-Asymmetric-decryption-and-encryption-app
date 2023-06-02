import React, { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
  const [plaintext, setPlaintext] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [responseTime, setResponseTime] = useState(0);

  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [plaintext2, setPlaintext2] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedPlaintext, setDecryptedPlaintext] = useState("");
  // RSA
  const handleEncrypt = () => {
    const start = performance.now(); // Record start time
    Axios.post("http://localhost:5000/encrypt", { plaintext: plaintext })
      .then((response) => {
        const end = performance.now(); // Record end time
        setResponseTime(end - start); // Calculate time difference
        setEncrypted(response.data.encrypted);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDecrypt = () => {
    const start = performance.now(); // Record start time
    Axios.post("http://localhost:5000/decrypt", { encrypted: encrypted })
      .then((response) => {
        const end = performance.now(); // Record end time
        setResponseTime(end - start); // Calculate time difference
        setDecrypted(response.data.plaintext);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ECC
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
    setDecryptedPlaintext(plaintext);
  };

  return (
    <div>
      <div>
        <h1>RSA</h1>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        />
        <button onClick={handleEncrypt}>Encrypt</button>
        <br />
        Encrypted message: {encrypted}
        <br />
        <button onClick={handleDecrypt}>Decrypt</button>
        <br />
        Decrypted message: {decrypted}
        <br />
        Response time: {responseTime} ms
      </div>
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
    </div>
  );
};

export default App;
