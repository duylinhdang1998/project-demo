// import env from 'env';
// import { getSdk } from 'graphql/generated/graphql';
// import { GraphQLClient } from 'graphql-request';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import {
//   split,
//   HttpLink,
//   ApolloClient,
//   InMemoryCache,
//   OperationVariables,
//   DocumentNode,
//   ApolloLink,
// } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';

// const endpoint = env.apiEndPoint;

// const getAuthToken = () => {
//   const data = localStorage.getItem(env.tokenKey);
//   if (data) {
//     try {
//       return JSON.parse(data).token;
//     } catch (error) {
//       return null;
//     }
//   }
//   return null;
// };

// const httpLink = new HttpLink({
//   uri: endpoint,
// });

// const wsLink = new WebSocketLink({
//   uri: process.env.REACT_APP_API_WS || '',
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authorization: `Bearer ${getAuthToken()}`,
//     },
//   },
// });

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   wsLink,
//   httpLink,
// );

// export const getClient = (auth = true, signal?: AbortSignal) => {
//   const headers: any = {};

//   if (auth) {
//     headers.authorization = auth ? `Bearer ${getAuthToken()}` : undefined;
//   }

//   const graphQLClient = new GraphQLClient(endpoint, {
//     headers,
//     signal,
//   });

//   return graphQLClient;
// };

// export const clientSub = new ApolloClient({
//   link: ApolloLink.from([link]),
//   cache: new InMemoryCache(),
// });

// export const subScription = (query: DocumentNode, variables?: OperationVariables) => {
//   return clientSub.subscribe({
//     query,
//     variables,
//     // fetchPolicy: 'no-cache'
//   });
// };

// export const getSDK = (auth = true, signal?: AbortSignal) => {
//   const client = getClient(auth, signal);
//   return getSdk(client);
// };

// export default {
//   getClient,
//   getSDK,
// };
