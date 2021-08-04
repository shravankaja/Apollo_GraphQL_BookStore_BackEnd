require("dotenv").config();
const {
  nameRegEx,
  phoneRegEx,
  emailRegEx,
  passwordRegEx,
} = require("../../Constants/RegExprs");
const userSchema = require("../../../Models/userSchema");
const {
  encryptPassword,
  passwordCheckReturnAcessToken,
} = require("../../Helpers/signUpAndSignIn.js");

exports.signUp = async (_, { fullName, email, phone, password }) => {
  console.log("email :", email);
  try {
    if (!nameRegEx.test(fullName)) {
      return {
        message:
          "Name must start with capital and should have atleast three characters",
      };
    }
    if (!phoneRegEx.test(phone)) {
      return {
        message: "Should have only numbers and 10 numbers",
      };
    }
    if (!emailRegEx.test(email)) {
      return {
        message: "Email Should have @ and no special characters allowed",
      };
    }
    if (!passwordRegEx.test(password)) {
      return {
        message:
          "Password should have atleast one scpecial character, captial letter and a number",
      };
    }

    let obj = await userSchema.find({ email: email }).exec();
    if (obj.length > 0) {
      return {
        message: "Email already exsists",
      };
    }

    let encryptedPassword = await encryptPassword(password);

    let user = userSchema({
      fullName: fullName,
      email: email,
      phone: phone,
      password: encryptedPassword,
    });

    user
      .save()
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        return {
          message: err,
        };
      });
    return {
      message: "User Added Successfully",
    };
  } catch (err) {
    return {
      message: "Something went wrong",
    };
  }
};

exports.signIn = async (_, { email, password }) => {
  try {
    let obj = await userSchema.find({ email: email }).exec();
    console.log(obj);
    if (obj.length == 0) {
      return {
        message: "Email is not registered",
        accessToken: null,
      };
    } else if (obj.length == 1) {
      let accessToken = passwordCheckReturnAcessToken(
        password,
        obj[0].password,
        email
      );
      return {
        message: "Login sccuessfull",
        accessToken: accessToken,
      };
    } else {
      return {
        message: "Please check password",
        accessToken: null,
      };
    }
  } catch (err) {
    return {
      message: err,
    };
  }
};
