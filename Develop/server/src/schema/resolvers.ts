// import  User from "../models/User.js";
// import { BookDocument } from "../models/Book.js";

import { BookDocument } from '../models/Book';
import { User} from '../models/index.js';
import { signToken } from '../services/auth.js';

// defined User interface
interface User {
  _id: string
  username: string
  email: string
  bookCount: number
  password: string
  savedBooks: BookDocument
}

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello, World!";
    },
    getAllUsers: async () => {
      try {
        return await User.find({});
      } catch (error:any) {
        throw new Error('Failed to fetch users: ' + error.message);
      }
     }
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new User with provided username, email and password
      const user = await User.create({...input});

      //Sign a JWT token for the new User
      const token = signToken(user.username, user.email, user._id);
      
      //Return the token along with the new User
      return {token, user}
    }
  }
};

export default resolvers;


