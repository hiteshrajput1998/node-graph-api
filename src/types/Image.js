import { gql } from 'apollo-server';

export default gql`
    scalar Upload
    type Photo {
        id: Int,
        fileLocation: String,
        description: String,
        tags: String
    }
    type Mutation{
        uploadImage(file: Upload): Photo
    }
`;