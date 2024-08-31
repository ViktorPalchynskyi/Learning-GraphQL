// https://studio.apollographql.com/sandbox/explorer

import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import connectDB from './config/database';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './graphql/schema';
import { buildSubgraphSchema } from '@apollo/subgraph';

const app = express();
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

connectDB();

server.start().then(() => {
    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server)
    );
});

app.listen({ port: 4000 }, () => {
    console.log(`Server is running at http://localhost:4000`);
});
