import React, { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
  //RSA
  const [plaintext, setPlaintext] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [responseTime, setResponseTime] = useState(0);
  //ECC
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [plaintext2, setPlaintext2] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedPlaintext, setDecryptedPlaintext] = useState("");
  	
  // AES
  const [plaintext3, setPlaintext3] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [iv, setIV] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

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

  // AES

  

  const handleEncrypt3 = () => {
    Axios.post('http://localhost:5000/encrypt-with-aes', { plaintext: plaintext })
      .then(response => {
        setSecretKey(response.data.secretKey);
        setIV(response.data.iv);
        setEncryptedData(response.data.encryptedData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDecrypt = () => {
    Axios.post('http://localhost:5000/decrypt-with-aes', {
      secretKey: secretKey,
      iv: iv,
      encryptedData: encryptedData
    })
      .then(response => {
        setDecryptedData(response.data.decryptedData);
      })
      .catch(error => {
        console.log(error);
      });
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
      <div>
      <h1>AES Encryption and Decryption</h1>
      <div>
        <label>Plaintext:</label>
        <input type="text" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} />
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>
      <div>
        <label>Secret Key:</label>
        <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
      </div>
      <div>
        <label>IV:</label>
        <input type="text" value={iv} onChange={(e) => setIV(e.target.value)} />
      </div>
      <div>
        <label>Encrypted Data:</label>
        <input type="text" value={encryptedData} onChange={(e) => setEncryptedData(e.target.value)} />
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div>
        <label>Decrypted Data:</label>
        <input type="text" value={decryptedData} onChange={(e) => setDecryptedData(e.target.value)} />
      </div>
    </div>
    </div>
  );
};

export default App;
