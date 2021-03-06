import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
  },
})
