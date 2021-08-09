import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from '../types/News';
import newsResolver from '../resolvers/News';

export const newsModule = new GraphQLModule({
    typeDefs: typeDefs,
    resolvers: newsResolver
});