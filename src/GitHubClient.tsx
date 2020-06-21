import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Loader } from './components/Loader'
import { GenericError } from './components/GenericError'

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

export interface IRepository {
  avatarUrl: string
  id: string
  name: string
}

export interface IOrgQueryData {
  data: {
    search: {
      edges: {
        cursor: string
        node: IRepository
      }
    }
  }
}

export interface IOrgQueryVariables {
  first: number
  query: string
  cursor?: string
}

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

  if (loading) return <Loader />
  if (error) return <GenericError />

  return (
    <React.Fragment>
      <h2 className="font-display">Search GitHub for an orgnaization:</h2>
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        type="text"
        placeholder="Organization name e.g. Netflix"
      />
    </React.Fragment>
  )
}
