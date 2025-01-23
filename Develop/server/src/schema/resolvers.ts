import User from "../models/User.js";

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
  }
};

export default resolvers;


