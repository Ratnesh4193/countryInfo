import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./client";
import Screen from "./Screen";

const App = () => (
  <ApolloProvider client={client}>
    <Screen />
  </ApolloProvider>
);

export default App;
