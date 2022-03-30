import { gql } from "apollo-server-express";

export default gql`
  input UserInput {
    userName: String!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    avatar: String
  }

  type User {
    userName: String!
    email: String!
    firstName: String!
    lastName: String!
    avatar: String
  }

  type AuthResp {
    user: User
    token: String!
  }

  extend type Query {
    authUser: User!
    authenticateUser(userName: String!, password: String!): AuthResp!
  }
  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
  }
`;
