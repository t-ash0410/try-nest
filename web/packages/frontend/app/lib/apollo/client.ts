import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/index.js'
import { RestLink } from 'apollo-link-rest'

const graphqlLink = createHttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  credentials: 'include',
})

const restLink = new RestLink({
  uri: import.meta.env.VITE_BACKEND_URL,
  credentials: 'include',
})

const client = new ApolloClient({
  link: ApolloLink.from([graphqlLink, restLink]),
  cache: new InMemoryCache(),
})

export { client }
