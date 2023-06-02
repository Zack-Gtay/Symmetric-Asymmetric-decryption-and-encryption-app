import Axios  from 'axios';
import React, { useState } from 'react'

const Des = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [key, setKey] = useState('');

  const handleEncrypt = () => {
    Axios.post('http://localhost:5000/encrypt-des', { plaintext, key })
      .then(response => {
        setCiphertext(response.data.ciphertext);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDecrypt = () => {
    Axios.post('http://localhost:5000/decrypt-des', { ciphertext, key })
      .then(response => {
        setDecryptedText(response.data.decryptedText);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center text-center mt-5 gap-2 ">
      <h1>DES Encryption and Decryption</h1>
      <div>
        <label>Plaintext:</label>
        <input type="text" value={plaintext} onChange={e => setPlaintext(e.target.value)} />
      </div>
      <div>
        <label>Key:</label>
        <input type="text" value={key} onChange={e => setKey(e.target.value)} />
      </div>
      <button onClick={handleEncrypt}>Encrypt</button>
      <br />
      <div>
        <label>Ciphertext:</label>
        <input type="text" value={ciphertext} readOnly />
      </div>
      <button onClick={handleDecrypt}>Decrypt</button>
      <br />
      <div>
        <label>Decrypted Text:</label>
        <input type="text" value={decryptedText} readOnly />
      </div>
    </div>
  )
}

export default Des