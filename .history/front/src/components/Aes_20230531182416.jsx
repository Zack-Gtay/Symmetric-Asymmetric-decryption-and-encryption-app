import React, { useState } from 'react'

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
    <div>Aes</div>
  )
}

export default Aes