import { gql } from 'apollo-server';

const collegeField = `
    collegeName: String
    address: String
`;

export default gql`

    type College{
        id: String
        ${collegeField}
    }
    input CreateCollegeInput{
        ${collegeField}
    }
    input UpdateCollegeInput{
        ${collegeField}
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
