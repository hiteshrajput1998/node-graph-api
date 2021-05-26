import { GraphQLUpload } from 'graphql-upload';
import mutations from './mutations';
import queries from './queries';

export default {
    Upload: GraphQLUpload,
    Mutation: {
        ...mutations
    }
};