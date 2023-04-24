// Ce fichier contient les fonctions pour pouvoir hash les clées

const forge = require("node-forge");

// Génère une paire de clé de style RSAES-OAEP
function generateKeyPairRSA() {
  const keys = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKey = forge.pki.publicKeyToPem(keys.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keys.privateKey);
  return { publicKey, privateKey };
}

// Encode un message avec RSAES-OAEP
function encodeRSAOAEP(plaintext, publicKey) {
  const key = forge.pki.publicKeyFromPem(publicKey);
  const buffer = forge.util.createBuffer(plaintext, "utf8");
  const ciphertext = key.encrypt(buffer.getBytes(), "RSA-OAEP");
  return forge.util.encode64(ciphertext);
}

// Decode un message avec RSAES-OAEP
function decodeRSAOAEP(ciphertext, privateKey) {
  const key = forge.pki.privateKeyFromPem(privateKey);
  const buffer = forge.util.decode64(ciphertext);
  const plaintext = key.decrypt(buffer, "RSA-OAEP");
  return plaintext.toString("utf8");
}

//Export les fonctions pour qu'elle puissent être usées a l'extérieur de ce fichier
module.exports = { encodeRSAOAEP, decodeRSAOAEP, generateKeyPairRSA };
