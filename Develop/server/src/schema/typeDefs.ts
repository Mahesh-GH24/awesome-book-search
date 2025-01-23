const typeDefs = `
  type User {
    username: String
    email: String
    password: String
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
   getAllUsers: [User]!
  }
`;

export default typeDefs;
