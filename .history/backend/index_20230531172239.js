import express from "express";
import cors from "cors";
import NodeRSA from "node-rsa";
import crypto from "crypto";
import elliptic from "elliptic";
import eccrypto from "eccrypto-js";

const ec = new elliptic.ec("p256");
const ellipticCurve = new elliptic.ec("secp256k1");
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
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Encryption failed");
    });
});


// AES
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32); // Generate a random secret key
const iv = crypto.randomBytes(16); // Generate a random initialization vector

app.post('/encrypt-with-aes', (req, res) => {
  const { plaintext } = req.body;

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(plaintext, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  res.send({
    secretKey: secretKey.toString('hex'),
    iv: iv.toString('hex'),
    encryptedData: encryptedData,
  });
});

app.post('/decrypt-with-aes', (req, res) => {
  const { secretKey, iv, encryptedData } = req.body;

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  res.send({ decryptedData: decryptedData });
});

app.listen(5000, () => console.log("app is running"));
