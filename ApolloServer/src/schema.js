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
    addUser(
      fullName: String
      email: String
      password: String
      phone: Float
    ): User
    signUp(
      fullName: String
      email: String
      password: String
      phone: Float
    ): Message
    signIn(email: String, password: String): SignInResponse
  }
  type Message {
    message: String
  }
  type SignInResponse {
    message: String
    code: String
    accessToken: ID
  }
`;
