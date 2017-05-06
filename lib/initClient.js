import { ApolloClient, createNetworkInterface, createBatchingNetworkInterface } from 'react-apollo'

let apolloClient = null

const loggerMiddleware = {
    applyBatchMiddleware(req, next) {
        console.log('From middleware: ', req.requests.map(v => v.operationName));
        next();
    },
};

function _initClient (headers, initialState) {

  const networkInterface = createBatchingNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
      batchInterval: 10,
      opts: {
          credentials: 'same-origin'
          // Pass headers here if your graphql server requires them
      }
  });

  networkInterface.use([loggerMiddleware]);

  return new ApolloClient({
      initialState,
      ssrMode: !process.browser,
      dataIdFromObject: result => result.id || null,
      networkInterface: networkInterface
  });
}

export const initClient = (headers, initialState = {}) => {
  if (!process.browser) {
    return _initClient(headers, initialState)
  }
  if (!apolloClient) {
    apolloClient = _initClient(headers, initialState)
  }
  return apolloClient
}
