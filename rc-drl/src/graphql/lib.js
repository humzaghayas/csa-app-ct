import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  // uri: 'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql',
  cache: new InMemoryCache(),
  link: from([
    errorLink,
    ApolloLink.split(
      (operation) => operation.getContext().target === 'register',
      'https://ms-gateway-f4b4o225iq-ue.a.run.app/graphql'
    ),
  ]),
});

export const ApolloClientProvider = ({ children, props }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
