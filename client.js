import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql'
});

export default client;
