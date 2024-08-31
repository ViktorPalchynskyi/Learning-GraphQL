import { gql } from 'apollo-server-express';

export const userSchema = gql`
    type User {
        id: ID!
        name: String!
        friends: [User]
        products: [Products]
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(name: String!, password: String): User
        addFriend(userId: ID!, friendId: ID!): User
    }
`;
