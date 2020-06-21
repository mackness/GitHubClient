import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import './App.css'

export const ORG_QUERY = gql(`
  query OrganizationQuery($first: Int, $query: String!, $after: String) {
    search(first: $first, type: USER, query: $query, after: $after) {
      userCount
      edges {
        cursor
        node {
          ... on Organization {
            id
            name
            avatarUrl(size: 100)
          }
        }
      }
    }
  }
`)

export interface IOrgQueryData {}

export interface IOrgQueryVariables {}

export function GitHubClient() {
  const { loading, error, data } = useQuery<IOrgQueryData, IOrgQueryVariables>(
    ORG_QUERY,
    {
      variables: {
        first: 10,
        query: 'super type:org',
      },
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="App">{<pre>{JSON.stringify(data, undefined, 2)}</pre>}</div>
  )
}
