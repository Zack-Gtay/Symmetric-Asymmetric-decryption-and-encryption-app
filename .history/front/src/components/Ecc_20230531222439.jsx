import Axios from "axios";
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
    <div className="flex flex-col w-full justify-center text-center mt-5 gap-2 ">
      <h1> Encrypt and Decrypt with ECC</h1>
      <button
        onClick={generateKeys}
        className="bg-gray-500 w-[30%] hover:drop-shadow-md self-center mt-2 p-3 rounded-md text-white"
      >
        Generate Keys
      </button>
      <br />
      <p>Public Key: {publicKey}</p>
      <p>Private Key: {privateKey}</p>
      <br />
      <br />
      <input
        type="text"
        value={plaintext2}
        onChange={(e) => setPlaintext2(e.target.value)}
        className="w-[30%] text-center self-center text-black drop-shadow-md outline-0 rounded-md p-3"
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
