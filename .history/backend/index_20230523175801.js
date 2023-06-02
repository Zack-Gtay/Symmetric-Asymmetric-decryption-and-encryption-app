import express from "express";
import cors from "cors";
import NodeRSA from "node-rsa";
import crypto from "crypto";
import elliptic from "elliptic";
import sjcl from "sjcl";
import eccrypto from "eccrypto-js";
const ec = new elliptic.ec("p256");

const app = express();
app.use(cors());
app.use(express.json());

// RSA
const key = new NodeRSA({ b: 2048 });
app.post("/encrypt", (req, res) => {
  const plaintext = req.body.plaintext;
  const encrypted = key.encrypt(plaintext, "base64");
  res.send({ encrypted: encrypted });
});
app.post("/decrypt", (req, res) => {
  const encrypted = req.body.encrypted;
  const plaintext = key.decrypt(encrypted, "utf8");
  res.send({ plaintext: plaintext });
});

// ECC

app.post("/generate-keys", (req, res) => {
  const keyPair = ec.genKeyPair();
  const publicKey = keyPair.getPublic("hex");
  const privateKey = keyPair.getPrivate("hex");
  res.send({ publicKey: publicKey, privateKey: privateKey });
});
function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

app.post("/encrypt-with-ecc", (req, res) => {
  const plaintext = req.body.plaintext;
  const privateKey = eccrypto.generatePrivate();
  const publicKey = eccrypto.getPublic(privateKey);

  const publicKeyHex = bytesToHex(publicKey);
  const privateKeyHex = bytesToHex(privateKey);
  const ciphertextBuffer = eccrypto.encrypt(
    publicKey,
    Buffer.from(plaintext, "utf8")
  );

  Promise.all([publicKeyHex, privateKeyHex, ciphertextBuffer])
    .then((ciphertext) => {
      res.send({
        ciphertext: ciphertext.toString(),
        publicKey: publicKey.toString(),
        privateKey: privateKey.toString()
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Encryption failed");
    });
});

app.post('/decrypt-with-ecc', async (req, res) => {
  const { privateKey, ciphertext } = req.body;

  // Convert the private key from hexadecimal string to Buffer
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');

  try {
    // Decrypt the ciphertext using the private key
    const decryptedBytes = await eccrypto.decrypt(privateKeyBuffer, ciphertext);

    // Convert the decrypted bytes to a UTF-8 string
    const decryptedPlaintext = decryptedBytes.toString('utf-8');

    res.send({ decryptedPlaintext });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).send('Decryption error');
  }
});


app.listen(5000, () => console.log("app is running"));
