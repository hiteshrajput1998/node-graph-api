import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from '../types/User';
import userResolver from '../resolvers/User';

export const userModule = new GraphQLModule({
    typeDefs: typeDefs,
    resolvers: userResolver
});