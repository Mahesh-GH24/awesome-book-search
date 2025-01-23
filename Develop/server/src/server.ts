import express from 'express';
import path from 'node:path';
import db from './config/connection.js';

//Added Apollo related imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

//Add typeDefs and resolvers
import {typeDefs, resolvers } from './schema/index.js';

//Commented
//import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;


//Create a new ApolloServer 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const startApolloServer = async () => {
  //start server
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Added 
  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

