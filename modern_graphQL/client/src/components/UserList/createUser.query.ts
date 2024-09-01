import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation Mutation($name: String!, $password: String) {
        addUser(name: $name, password: $password) {
            id
            name
        }
    }
`;
