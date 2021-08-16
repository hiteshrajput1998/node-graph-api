import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from '../types/Weather';
import weatherReolver from '../resolvers/Weather';

export const weatherModule = new GraphQLModule({
    typeDefs: typeDefs,
    resolvers: weatherReolver
});