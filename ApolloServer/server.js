const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("../ApolloServer/src/schema");
const { resolvers } = require("../ApolloServer/src/resolvers");
let mongoose = require("mongoose");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4001).then(({ url }) => {
  console.log(`Server ready at ${url}`);

  mongoose
    .connect("mongodb://localhost:27017/BookStore")
    .then(() => {
      console.log("connection successfull yes");
    })
    .catch((err) => {
      console.log(err);
    });
});
