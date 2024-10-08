const app = require('express')();
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log('Starting server');
});
