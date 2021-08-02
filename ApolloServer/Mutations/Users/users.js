require("dotenv").config();
const {
  nameRegEx,
  phoneRegEx,
  emailRegEx,
  passwordRegEx,
} = require("../../Constants/RegExprs");
const userSchema = require("../../../DB/Models/userSchema");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    let salt = await bycrypt.genSalt();
    let encryptedPassword = bycrypt.hashSync(password, salt);
    console.log(encryptedPassword);

    let user = userSchema({
      fullName: fullName,
      email: email,
      phone: phone,
      password: encryptedPassword,
    });

    function addToDb() {
      return new Promise((resolve, reject) => {
        user
          .save()
          .then((doc) => {
            console.log(doc);
            resolve("done");
          })
          .catch((err) => {
            reject("err");
            return {
              message: err,
            };
          });
      });
    }
    addToDb().then((resp) => {
      if (resp == "done") {
        console.log("Promise Working");
      }
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
        code: "FAIL",
        accessToken: null,
      };
    } else if (obj.length == 1) {
      let passwordCheck = await bycrypt.compare(password, obj[0].password);
      if (passwordCheck) {
        const accessToken = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN_SECRET
        );
        console.log(accessToken);
        return {
          message: "Login sccuessfull",
          code: "SUCCESS",
          accessToken: accessToken,
        };
      } else {
        return {
          message: "Please check password",
          code: "FAIL",
          accessToken: null,
        };
      }
    }
  } catch (err) {
    return {
      message: err,
    };
  }
};
