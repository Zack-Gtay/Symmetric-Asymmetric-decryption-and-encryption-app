import express from "express";
import cors from "cors";
import NodeRSA from "node-rsa";
import crypto from "crypto";
import elliptic from "elliptic";
import sjcl from "sjcl";
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
