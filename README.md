--Use graph-module:
    -for modularize GraphQL schema

-- modules folder contains all the modules

-- application.js contains graphql schema = To merge the schemas

--webpack: npm run build
--source-map-explorer: npx source-map-explorer dist/main.js --no-border-checks


--datamasking: npm maskdata


=> Serverless Apollo GraphQL Server with AWS Lambda:

    -> Local Development of apollo server with lambda
        Replace this line in hadler.js:
            1)apollo-server = apollo-server-lambda
            2)add line at last: export const graphqlHandler = server.createHandler();
            3)Comment server.listen line
    
=>git remote graphnode
	