const crypto = require('crypto');
const PASSWORD_SALT = 'pA$$@L%t';

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function passwordHash(password) {
    return sha512(password, PASSWORD_SALT).passwordHash;
}

module.exports = { passwordHash };