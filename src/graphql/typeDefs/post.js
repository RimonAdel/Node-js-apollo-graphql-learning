import { gql } from "apollo-server-express";

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    featuredImage: String
    createdAt: String
    updatedAt: String
  }

  input PostInput {
    title: String!
    content: String!
    featuredImage: String
  }

  type PostNotification{
    id: ID!
    message: String!
    success: Boolean!
  }

  extend type Query {
    getAllPosts: [Post!]!
    getPostByID(id: ID!): Post!
  }

  extend type Mutation {
    createNewPost(newPost: PostInput!): Post!
    editPostByID(updatedPost: PostInput!,id: ID!): Post!
    deletePostById(id: ID!): PostNotification!
  }

  
`;
