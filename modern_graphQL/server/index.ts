import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/database';
// import { typeDefs, resolvers } from './graphql/schema';
// import { startStandaloneServer } from '@apollo/server/standalone';

const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });

connectDB();

// server.applyMiddleware({ app });

// startStandaloneServer(server).then(({ url }) => {
//     console.log(`Server ready at ${url}`);
//   });

app.get('/', () => console.log('Hello there'));

app.listen({ port: 4000 }, () => {
    // server.graphqlPath
    console.log(`Server is running at http://localhost:4000`);
});
