import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from '../types/Image';
import imageResolver from '../resolvers/Image';

export const imageModule = new GraphQLModule({
    typeDefs: typeDefs,
    resolvers: imageResolver
});