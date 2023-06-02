import express from "express";
import cors from "cors";
import NodeRSA from "node-rsa";
import crypto from "crypto";
import elliptic from "elliptic";
import eccrypto from "eccrypto-js";
import CryptoJS from "crypto-js";

const ec = new elliptic.ec("p256");
const ellipticCurve = new elliptic.ec("secp256k1");
const app = express();
app.use(cors());
app.use(express.json());
app.use()
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
const algorithm = "aes-256-cbc";
const secretKey = crypto.randomBytes(32); // Generate a random secret key
const iv = crypto.randomBytes(16); // Generate a random initialization vector

app.post("/encrypt-with-aes", (req, res) => {
  const { plaintext } = req.body;

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(plaintext, "utf8", "hex");
  encryptedData += cipher.final("hex");

  res.send({
    secretKey: secretKey.toString("hex"),
    iv: iv.toString("hex"),
    encryptedData: encryptedData,
  });
});

app.post("/decrypt-with-aes", (req, res) => {
  const { secretKey, iv, encryptedData } = req.body;

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(iv, "hex")
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");

  res.send({ decryptedData: decryptedData });
});

// Encrypt plaintext using DES algorithm
const encrypt = (plaintext, key) => {
  const cipher = crypto.createCipheriv("des-ede3-cbc", key, "");
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Decrypt ciphertext using DES algorithm
const decrypt = (ciphertext, key) => {
  const decipher = crypto.createDecipheriv("des-ede3-cbc", key, "");
  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

app.post("/encrypt-with-des", (req, res) => {
  const plaintext = req.body.plaintext;
  const key = req.body.key;

  try {
    const encrypted = encrypt(plaintext, key);
    res.json({ encrypted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Encryption failed" });
  }
});

app.post("/decrypt-with-des", (req, res) => {
  const encrypted = req.body.encrypted;
  const key = req.body.key;

  try {
    const decrypted = decrypt(encrypted, key);
    res.json({ decrypted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Decryption failed" });
  }
});

app.post("/encrypt-des", (req, res) => {
  const { plaintext, key } = req.body;
  const ciphertext = CryptoJS.DES.encrypt(plaintext, key).toString();
  res.json({ ciphertext });
});

app.post("/decrypt-des", (req, res) => {
  const { ciphertext, key } = req.body;
  const decryptedText = CryptoJS.DES.decrypt(ciphertext, key).toString(
    CryptoJS.enc.Utf8
  );
  res.json({ decryptedText });
});

app.listen(5000, () => console.log("app is running"));
