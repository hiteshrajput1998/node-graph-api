/* eslint-disable no-undef */
/*eslint linebreak-style: ["error", "windows"]*/
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { mySchema } from './application';
import { createTestClient } from 'apollo-server-testing';
import db from './config/db';
import Logger from './logger';
import { Promise } from 'mongoose';
require('dotenv').config();

const logger = new Logger('Handler', 'handler.js');

async function startApolloServer() {
    await db();

    const { schema } = mySchema;
    // const schema = mySchema.createSchemaForApollo();
    const port = process.env.GRAPHQL_APP_PORT || 4000;
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
            res.header('Strict-Transport-Security', 'max-age=10368000; includeSubDomains')  // 120days
        },
        //plugins: [responseCachePlugin()],
        formatError: function (err) {
            console.log(`err.message: ${JSON.stringify(err)}`);
            return err;
        },
        playground: true,
        introspection: true,
    });

    const app = express();

    app.use(helmet());
    server.applyMiddleware({ app });

    await new Promise(resolve => app.listen({ port: port }, resolve));
    logger.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

    return { server, app };
}

startApolloServer();
// const testClient = createTestClient(server);

// export default testClient;

