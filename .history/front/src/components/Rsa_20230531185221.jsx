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
    <div className="flex flex-col w-full justify-center text-center ">
      <h1>RSA</h1>
      <input
        type="text"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
        className="w-[30%] text-center self-center bg-slate-300 outline-1"
      />
      <button
        onClick={handleEncrypt}
        className="bg-gray-500 w-[30%] self-center mt-2 p-3 rounded-md"
      >
        Encrypt
      </button>
      <br />
      <label>Encrypted Data:</label>
      <input
        type="text"
        value={encrypted}
        className="w-[30%] text-center self-center"
      />
      <br />
      <button onClick={handleDecrypt}>Decrypt</button>
      <br />
      <label>Decrypted Data:</label>
      <input
        type="text"
        value={decrypted}
        className="w-[30%] text-center self-center"
      />
      <br />
      Response time: {responseTime} ms
    </div>
  );
};

export default Rsa;
