const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type User {
    fullName: String
    email: String
    password: String
    phone: Float
  }

  type Query {
    users: [User]
  }
  type Mutation {
    signUp(
      fullName: String
      email: String
      password: String
      phone: Float
    ): Message
    signIn(email: String, password: String): Message
  }
  type Message {
    message: String
    accessToken: ID
  }
`;
