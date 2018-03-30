// App.js
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import RootRouter from "./RootRouter";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { getToken } from "./loginUtils";

StatusBar.setBarStyle('light-content');
import Products from './Products';

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjee5dwvi0hcl0173gtl9neie"
});

//const link = authLink.concat(httpLink);
const link = httpLink;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});



export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootRouter />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
