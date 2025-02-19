import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/index.js'

const graphqlLink = createHttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  credentials: 'include',
})

const client = new ApolloClient({
  link: ApolloLink.from([graphqlLink]),
  cache: new InMemoryCache(),
})

export { client }
