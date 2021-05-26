import { gql } from 'apollo-server';

export default gql`
    type College{
        id: String
        collegeName: String
        address: String
    }
    input CreateCollegeInput{
        collegeName: String
        address: String
    }
    input UpdateCollegeInput{
        collegeName: String
        address: String
    }
    type Status{
        message: String
        data: College
    }
    type Query{
        getcolleges: [College]
        getCollege(id: String): [College]
    }
    type Mutation{
        createCollege(input: CreateCollegeInput): Status
        updateCollege(id: String!, input: UpdateCollegeInput): Status
        deleteCollege(id: String!): Status
        deleteColleges(ids: [String]!): Status
    }
`;
