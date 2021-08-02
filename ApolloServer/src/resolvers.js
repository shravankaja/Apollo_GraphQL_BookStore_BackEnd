const { signUp, signIn } = require("../Mutations/Users/users");

exports.resolvers = {
  Mutation: {
    signUp,
    signIn,
  },
};
