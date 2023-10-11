import * as crypto from "crypto";

const algorithm = 'aes-256-ctr';
const key = Buffer.from('xNRxA48aNYd33PXaODSutRNFyCu4cAe/InKT/Rx+bw0=', 'base64');
const iv = Buffer.from('81dFxOpX7BPG1UpZQPcS6w==', 'base64');

function encrypt(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
}

async function decrypt(data) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    return decipher.update(data.toString(), 'base64', 'utf8') + decipher.final('utf8');
}

  module.exports = { encrypt, decrypt }
