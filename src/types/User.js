import { gql } from 'apollo-server';

export default gql`
    type User{
        id: String
        userName: String
        email: String
        created: String
    }
    type Token{
        token: String
    }
    type Response{
        message: String
        data: User
    }
    input RegisterInput {
        userName: String
        password: String
        email: String
        created: String
    }
    type Mutation{
        loginUser(data2: String!): Token
        registerUser(inputRegister: RegisterInput): Response
    }
    type Query{
        getUsers: [User]
        getUser(id: String!): [User]
    }
`;