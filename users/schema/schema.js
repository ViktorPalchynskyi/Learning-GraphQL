// set up json-server npm install json-server@0

const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = graphql;

const baseURL = 'http://localhost:3000';

// query fragment
// fragment companyDetails on Companies {
//     name
//     description
//     users{
//       firstName
//       age
//     }
//   }

//   query fetchCompanyWithUsers {
//     apple: companies(id:"1") {
//      ...companyDetails
//     }

//     google: companies(id:"2") {
//       ...companyDetails
//     }
//   }

const CompaniesType = new GraphQLObjectType({
    name: 'Companies',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue) {
                const { id } = parentValue;

                return axios
                    .get(`${baseURL}/companies/${id}/users`)
                    .then((res) => res.data);
            },
        },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
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
    }),
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

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: GraphQLString,
                age: GraphQLInt,
                companyId: GraphQLString,
            },
            resolve(_, args) {},
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery });
