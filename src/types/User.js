import { gql } from 'apollo-server';

const userField = `
    created: String
    email: String
    firstName: String
    lastName: String
    userName: String
`;

export default gql`
    type User{
        ${userField}
        id: String
    }
    type Token{
        token: String
        message: String
    }
    type Response{
        message: String
        data: User
    }
    type EmailResponse{
        message: String,
        data: String
    }
    input RegisterInput {
        ${userField}
        password: String
    }
    input EmailInput{
        ${userField}
    }
    type Mutation{
        loginUser(data2: String!): Token
        registerUser(inputRegister: RegisterInput): Response
        sendEmail(input: EmailInput!): EmailResponse
    }
    type Query{
        getUsers: [User]
        getUser(id: String!): User
        verifyOTP(otp: String!, userName: String!): String
    }
`;