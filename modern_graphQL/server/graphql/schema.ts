import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import userResolver from './resolvers/userResolver';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import gql from 'graphql-tag';

console.log(
    'the way',
    path.join(process.cwd(), '.graphql/schemas/productSchema.graphql')
);

const typeDefs = mergeTypeDefs([
    gql(
        readFileSync(
            path.join(
                process.cwd(),
                'graphql/schemas/productSchema.graphql'
            ),
            {
                encoding: 'utf-8',
            }
        )
    ),
    gql(
        readFileSync(
            path.join(process.cwd(), 'graphql/schemas/userSchema.graphql'),
            {
                encoding: 'utf-8',
            }
        )
    ),
]);
const resolvers = userResolver;

export { typeDefs, resolvers };
