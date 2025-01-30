import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

//Added import for ApolloClient
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const uriLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});


//Added for ApolloClient
const client = new ApolloClient({
  // uri: '/graphql',
  link: authLink.concat(uriLink),
  cache: new InMemoryCache(),
});

//Revised for ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

//Previous
// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

export default App;
