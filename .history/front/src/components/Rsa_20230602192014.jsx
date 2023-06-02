import Axios from "axios";
import React, { useState } from "react";

const Rsa = () => {
  const [plaintext, setPlaintext] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [responseTime, setResponseTime] = useState(0);

  const handleEncrypt = () => {
    const start = performance.now(); // Record start time
    Axios.post("https://symmetric-asymmetric-decryption-and.onrender.com/encrypt", { plaintext: plaintext })
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
    <div className="flex flex-col w-full justify-center text-center mt-5 gap-2 ">
      <h1>Encrypt and Decrypt with RSA</h1>
      <input
        type="text"
        placeholder="Enter data to encrypt"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
        className="mt-3 w-[30%] text-center self-center text-black drop-shadow-md outline-0 rounded-md p-3"
      />
      <button
        onClick={handleEncrypt}
        className="bg-gray-500 w-[30%] hover:drop-shadow-md self-center mt-2 p-3 rounded-md text-white"
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
      <button
        onClick={handleDecrypt}
        className="bg-gray-500 w-[30%] hover:drop-shadow-md self-center mt-2 p-3 rounded-md text-white"
      >
        Decrypt
      </button>
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
