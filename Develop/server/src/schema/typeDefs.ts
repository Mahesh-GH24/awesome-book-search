const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }
  
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
  }
  
  type Query {
   helloWorld: String!
   getSingleUser: [User]!
  }
`;

export default typeDefs;
