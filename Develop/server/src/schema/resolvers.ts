// import  User from "../models/User.js";
// import { BookDocument } from "../models/Book.js";

//import { saveBook } from '../controllers/user-controller';
//import { BookDocument } from '../models/Book';

//import { BookDocument } from '../models/Book.js';
import { Book, User } from '../models/index.js';
import { AuthenticationError, signToken } from '../services/auth.js';

//defined Book interface
interface Book {
  bookId: string;
  authors: string[];
  description: string;
  title: string;
  image: string;
  link: string;
}

// defined User interface
interface User {
  _id: string;
  username: string;
  email: string;
  bookCount: number;
  password: string;
  savedBooks: Book[];
}

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface AddBookArgs {
  input: {
    authors: [string];
    description: string;
    title: string;
    image: string;
    link: string;
  }
}


interface RemoveBookArgs {
  bookId: string;
}

interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello, World!";
    },
    // getAllUsers: async () => {
    //   try {
    //     return await User.find({});
    //   } catch (error:any) {
    //     throw new Error('Failed to fetch users: ' + error.message);
    //   }
    //  },
     me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
      if (context.user) {
        return await User.findOne({_id: context.user._id});
      }
      throw AuthenticationError;
     }
  },
  Mutation: {

    //addUser
    //  (_parent: any, args: any): Promise<{token: string; user: AddUserArgs}>
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new User with provided username, email and password
      const user = await User.create({...input});

      //Sign a JWT token for the new User
      const token = signToken(user.username, user.email, user._id);
      
      //Return the token along with the new User
      return {token, user}
    },

    //login
    //login: async (_parent: any, {email, password}: { email: string; password: string }): Promise<{token: string; user: User }> => {
      login: async (_parent: any, {email, password}: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw AuthenticationError;
      }
      const token = signToken(user.username, user.email, user._id);
      console.log("token signed in resolvers");
      return { token, user };
    },

    //saveBook
    saveBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
      if (context.user) {
        //create book
        const book = await Book.create({ ...input});
        //now find user and update book
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: {savedBooks: book._id}},
          {new: true}
        );
        

        return updatedUser;
      }
      throw new AuthenticationError('user not authenticated');
      
    },

    //removeBook
    removeBook: async (_parent: any, {bookId}: RemoveBookArgs, context: any) => {
      if (context.user) {
        //find and delete
        const book = await Book.findOneAndDelete(
          { bookId: bookId }
        );

        if(!book){
          throw AuthenticationError;
        }

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book._id }}
        );

        return User;
      }
      throw AuthenticationError;
    }
  }
};

export default resolvers;


