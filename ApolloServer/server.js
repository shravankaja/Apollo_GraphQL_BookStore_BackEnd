const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("../ApolloServer/src/schema");
const { resolvers } = require("../ApolloServer/src/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
