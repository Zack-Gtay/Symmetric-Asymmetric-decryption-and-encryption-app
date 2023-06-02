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

app.post("/encrypt-with-ecc", (req, res) => {
  const plaintext = req.body.plaintext;
  const privateKey = eccrypto.generatePrivate();
  const publicKey = eccrypto.getPublic(privateKey);
  const publicKeyHex = publicKey.getPublic().encode('hex');
  const privateKeyHex = privateKey.getPrivate().toString('hex');
  const ciphertextBuffer = eccrypto.encrypt(publicKey, Buffer.from(plaintext, 'utf8'));

  Promise.all([publicKeyHex, privateKeyHex, ciphertextBuffer]).then(([publicKey, privateKey, ciphertext]) => {
    res.send({
      publicKey: publicKey,
      privateKey: privateKey,
      ciphertext: ciphertext.toString('base64'),
    });
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Encryption failed');
  });
});


app.post("/decrypt-with-ecc", (req, res) => {
  const encrypted = req.body.encrypted;
  const privateKey = req.body.privateKey;
  const plaintext = ec
    .keyFromPrivate(privateKey, "hex")
    .decrypt(encrypted)
    .toString();
  res.send({ plaintext: plaintext });
});

app.listen(5000, () => console.log("app is running"));
