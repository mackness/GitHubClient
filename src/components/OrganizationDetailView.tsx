import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  IOrgDetailQueryData,
  IOrgDetailQueryVariables,
  IEdge,
  IRepository,
} from '../types'
import { getRepositoryDetailPath } from '../helpers/routes'
import { Loader } from './Loader'
import { GenericError } from './GenericError'
import { LanguagePills } from './LanguagePills'

export const ORG_DETAIL_QUERY = gql(`
  query OrganizationDetailQuery($login: String!) {
    organization(login: $login) {
      repositories(first: 25, orderBy: { field: PUSHED_AT, direction: DESC }) {
        edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              openGraphImageUrl
              languages(first: 5) {
                edges {
                  node {
                    color
                    name
                  }
                }
              }
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`)

export const RepositoryCard: React.FC<IRepository> = ({
  description,
  forkCount,
  name,
  openGraphImageUrl,
  languages,
  stargazers,
}) => {
  const { organizationLogin } = useParams()
  return (
    <Link to={getRepositoryDetailPath(organizationLogin, name)}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg h-full">
        <img
          className="w-6 mt-2 ml-3"
          src={openGraphImageUrl}
          alt={`${name} repository graphic`}
        />
        <div className="px-4 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base mb-2">{description}</p>
          <p className="text-gray-700 text-base">{`forks: ${forkCount}`}</p>
          <p className="text-gray-700 text-base">{`stars: ${stargazers.totalCount}`}</p>
        </div>
        <LanguagePills languages={languages.edges} />
      </div>
    </Link>
  )
}

export const OrganizationDetailView: React.FC = () => {
  const { organizationLogin } = useParams()
  const { loading, error, data } = useQuery<
    IOrgDetailQueryData,
    IOrgDetailQueryVariables
  >(ORG_DETAIL_QUERY, {
    variables: {
      login: decodeURIComponent(organizationLogin),
    },
  })

  if (loading) return <Loader />
  if (error) return <GenericError />

  return (
    <div className="container grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.organization.repositories.edges.map(
        (edge: IEdge<IRepository>, i: number) => {
          return <RepositoryCard {...edge.node} key={i} />
        }
      )}
    </div>
  )
}
