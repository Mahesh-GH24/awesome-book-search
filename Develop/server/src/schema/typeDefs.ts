const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    password: String
    savedBooks: [Book]
  }
  
  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  
  type Query {
   helloWorld: String!
   getAllUsers: [User]!
   getSingleUser(userId: ID!): User
  }

  type Mutation {
    addUser(input: UserInput!) : Auth
  }
`;

export default typeDefs;
