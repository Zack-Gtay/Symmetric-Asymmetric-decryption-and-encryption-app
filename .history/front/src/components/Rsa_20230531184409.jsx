import Axios from "axios";
import React, { useState } from "react";

const Rsa = () => {
  const [plaintext, setPlaintext] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [responseTime, setResponseTime] = useState(0);

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
  return (
    <div className='flex flex-col w-5'>
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
  );
};

export default Rsa;
