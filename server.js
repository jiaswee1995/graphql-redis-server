import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { makeExecutableSchema } from "graphql-tools";

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const PORT = 4000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.listen(PORT);
