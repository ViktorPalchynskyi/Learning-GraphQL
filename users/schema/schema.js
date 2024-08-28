// set up json-server npm install json-server@0

const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
} = graphql;

const users = [
    { id: '19', firstName: 'Viktor', age: 26 },
    { id: '7', firstName: 'Irina', age: 27 },
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id });
            },
        },
    },
});

module.exports = new GraphQLSchema({ query: RootQuery });
