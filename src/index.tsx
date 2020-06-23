import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './helpers/configure-apollo-client'
import { BrowserRouter } from 'react-router-dom'
import { isDevelopment } from './helpers/environment'
import { GitHubClient } from './GitHubClient'

if (isDevelopment() && !process.env.REACT_APP_GITHUB_API_TOKEN) {
  throw new Error(
    'Please set the value of REACT_APP_GITHUB_API_TOKEN enviornment variable to' +
      'a valid GitHub API access token. More information about how to create a' +
      'token can be found here:' +
      '\n https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token'
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GitHubClient />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
