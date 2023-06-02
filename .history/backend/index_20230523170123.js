import express from "express"
import cors from 'cors'
import NodeRSA from 'node-rsa'
import crypto from 'crypto'
import elliptic from 'elliptic'
const app = express()
app.use(cors())
app.use(express.json());

// RSA 
const key = new NodeRSA({b: 2048});
app.post('/encrypt', (req, res) => {
    const plaintext = req.body.plaintext;
    const encrypted = key.encrypt(plaintext, 'base64');
    res.send({encrypted: encrypted});
  });
app.post('/decrypt', (req, res) => {
const encrypted = req.body.encrypted;
const plaintext = key.decrypt(encrypted, 'utf8');
res.send({plaintext: plaintext});
});


// ECC


app.listen(5000, ()=>console.log("app is running"));