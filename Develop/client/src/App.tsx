import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

//Added import for ApolloClient
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

//Added for ApolloClient
const client = new ApolloClient({
  uri: '/graphql',
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
