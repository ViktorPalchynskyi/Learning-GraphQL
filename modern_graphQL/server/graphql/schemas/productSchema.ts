import { gql } from 'apollo-server-express';

export default gql`
    type Product {
        id: ID!
        title: String!
        creator: User
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
    }

    type Mutation {
        addProduct(title: String!, creatorId: ID!): Product
    }
`;
