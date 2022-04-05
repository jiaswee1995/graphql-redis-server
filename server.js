import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { makeExecutableSchema } from "graphql-tools";
import Redis from "ioredis";

require('dotenv').config();

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    username: process.env.REDIS_USERNAME, // needs Redis >= 6
    password: process.env.REDIS_PASSWORD,
    tls: {},
    db: process.env.REDIS_DEFAULT_DB, // Defaults to 0
})

const PORT = process.env.RUNNING_PORT;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { redis } }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.listen(PORT);
