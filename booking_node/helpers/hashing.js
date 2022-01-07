const crypto = require('crypto');
const secret = process.env.HASH_SECRET

exports.hashPassword = (password) => {
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
}