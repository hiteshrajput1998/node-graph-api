import { gql } from 'apollo-server';

export default gql`
    type User{
        created: String
        email: String
        firstName: String
        id: String
        lastName: String
        userName: String
    }
    type Token{
        token: String
    }
    type Response{
        message: String
        data: User
    }
    input RegisterInput {
        created: String
        email: String
        firstName: String
        lastName: String
        password: String
        userName: String
    }
    type Mutation{
        loginUser(data2: String!): Token
        registerUser(inputRegister: RegisterInput): Response
    }
    type Query{
        getUsers: [User]
        getUser(id: String!): User
    }
`;