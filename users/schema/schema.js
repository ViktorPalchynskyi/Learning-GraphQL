// set up json-server npm install json-server@0

const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
} = graphql;

const baseURL = 'http://localhost:3000';

const CompaniesType = new GraphQLObjectType({
    name: 'Companies',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    },
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompaniesType,
            resolve(parentValue) {
                const { companyId } = parentValue;

                return axios
                    .get(`${baseURL}/companies/${companyId}`)
                    .then((res) => res.data);
            },
        },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                const { id } = args;

                return axios
                    .get(`${baseURL}/users/${id}`)
                    .then((res) => res.data);
            },
        },
        companies: {
            type: CompaniesType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                const { id } = args;

                return axios
                    .get(`${baseURL}/companies/${id}`)
                    .then((res) => res.data);
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery });
