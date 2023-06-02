import React from 'react'

const Des = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [key, setKey] = useState('');

  const handleEncrypt = () => {
    axios.post('http://localhost:5000/encrypt-des', { plaintext, key })
      .then(response => {
        setCiphertext(response.data.ciphertext);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDecrypt = () => {
    axios.post('http://localhost:5000/decrypt-des', { ciphertext, key })
      .then(response => {
        setDecryptedText(response.data.decryptedText);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>Des</div>
  )
}

export default Des