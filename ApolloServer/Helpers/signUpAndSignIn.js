const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.encryptPassword = async (password) => {
    console.log("jeu")
    let salt = await bycrypt.genSalt();
    let encryptedPassword = bycrypt.hashSync(password, salt)
    return encryptedPassword
}

exports.passwordCheckReturnAcessToken = async (passwordEntered, passwordInDb, email) => {
    let passwordCheck = await bycrypt.compare(passwordEntered, passwordInDb);
    if (passwordCheck) {
        let accessToken = this.generateAccessToken(email)
        return accessToken;
    }
}

exports.generateAccessToken = (email) => {
    const accessToken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET
    );
    return accessToken
}
