//import User from "../models/User";

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello, World!";
    }
    // getSingleUser: async () => {
    //   return await User.find({});
    //  }
  }
};

export default resolvers;


