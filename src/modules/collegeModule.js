import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from '../types/College';
import collegeResolver from '../resolvers/College';

export const collegeModule = new GraphQLModule({
    typeDefs: typeDefs,
    resolvers: collegeResolver
});