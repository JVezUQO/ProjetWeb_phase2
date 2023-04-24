// Description: This file contains the functions for the hashing and encryption of the data

const forge = require("node-forge");

// Generate a key pair for RSAES-OAEP
function generateKeyPairRSA() {
  const keys = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKey = forge.pki.publicKeyToPem(keys.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keys.privateKey);
  return { publicKey, privateKey };
}

// Encode a message using RSAES-OAEP
function encodeRSAOAEP(plaintext, publicKey) {
  const key = forge.pki.publicKeyFromPem(publicKey);
  const buffer = forge.util.createBuffer(plaintext, "utf8");
  const ciphertext = key.encrypt(buffer.getBytes(), "RSA-OAEP");
  return forge.util.encode64(ciphertext);
}

// Decode a message encrypted in RSAES-OAEP
function decodeRSAOAEP(ciphertext, privateKey) {
  const key = forge.pki.privateKeyFromPem(privateKey);
  const buffer = forge.util.decode64(ciphertext);
  const plaintext = key.decrypt(buffer, "RSA-OAEP");
  return plaintext.toString("utf8");
}

module.exports = { encodeRSAOAEP, decodeRSAOAEP, generateKeyPairRSA };
