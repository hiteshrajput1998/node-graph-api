/* eslint-disable no-undef */
/*eslint linebreak-style: ["error", "windows"]*/
import { ApolloServer } from 'apollo-server';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { mySchema } from './application';
import { createTestClient } from 'apollo-server-testing';
import db from './config/db';
import Logger from './logger';
require('dotenv').config();

const logger = new Logger('Handler', 'handler.js');

db();

const { schema } = mySchema;
// const schema = mySchema.createSchemaForApollo();

const QUERY_SIZE_ALLOWED = process.env.QUERY_SIZE_ALLOWED || 300;

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
        const query = req.query.query || req.body.query || '';
        logger.log(`query: ${logger.stringify(query)} length: ${query.length}`);

        if (query.length > QUERY_SIZE_ALLOWED) {
            throw new Error('Query too large');
        }

        //authScope: req.headers.authorization,
        res.header('Strict-Transport-Security', 'max-age=10368000; includeSubDomains');  // 120days
    },
    //plugins: [responseCachePlugin()],
    formatError: function (err) {
        console.log(`err.message: ${JSON.stringify(err)}`);
        return err;
    },
    playground: true,
    introspection: true,
});

// const server = new ApolloServer({
//     typeDefs,
//     resolvers: merge(College, User),
//     context: ({ req }) => ({
//         authScope: req.headers.authorization
//     }),
//     formatError: (err) => {
//         logger.error(logger.stringify(err, null, 2));
//         if (err.message.startsWith(DATABASE_ERROR)) {
//             return new Error(INTERNAL_SERVER_ERROR);
//         }
//         return err;
//     }
// });

server.listen({ port: process.env.GRAPHQL_APP_PORT || 4000 }).then(({ url }) => {
    logger.log(`🚀 Server ready at ${logger.stringify(url, null, 2)}`);
});

const testClient = createTestClient(server);

export default testClient;