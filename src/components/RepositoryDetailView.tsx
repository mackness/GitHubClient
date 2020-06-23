import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  IRepoDetailQueryData,
  IRepoDetailQueryVariables,
  ICommit,
} from '../types'
import { Loader } from './Loader'
import { GenericError } from './GenericError'
import { LanuagePills } from './LanguagePills'

const REPO_DETAIL_QUERY = gql(`
  query RespositoryDetailQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      description
      homepageUrl
      createdAt
      languages(first: 10) {
        edges {
          node {
            ... on Language {
              name
            }
          }
        }
      }
      object(expression: "master") {
        ... on Commit {
          oid
          history(first: 10) {
            nodes {
              oid
              messageHeadline
              author {
                user {
                  login
                }
              }
              committedDate
            }
          }
        }
      }
    }
  }
`)

export interface ICommitLogProps {
  commits: ICommit[]
}

export const CommitLog: React.FC<ICommitLogProps> = ({ commits }) => {
  return (
    <div className="divide-y divide-gray-400">
      {commits.map(({ oid, messageHeadline, committedDate }: ICommit) => (
        <React.Fragment key={oid}>
          <p>commit: {oid}</p>
          <p>message: {messageHeadline}</p>
          <p>date: {committedDate}</p>
          <div className="text-center py-2" />
        </React.Fragment>
      ))}
    </div>
  )
}

export const RepositoryDetailView: React.FC = () => {
  const { repositoryName, organizationLogin } = useParams()
  const { loading, error, data } = useQuery<
    IRepoDetailQueryData,
    IRepoDetailQueryVariables
  >(REPO_DETAIL_QUERY, {
    variables: {
      owner: decodeURIComponent(organizationLogin),
      name: decodeURIComponent(repositoryName),
    },
  })

  if (loading) return <Loader />
  if (error) return <GenericError />

  const {
    repository: { name, description, languages, object },
  } = data!

  return (
    <div className="mt-3">
      <h1>{name}</h1>
      <h4>{description}</h4>
      <LanuagePills languages={languages.edges} />
      <h4>Commit Log:</h4>
      {object && <CommitLog commits={object.history.nodes} />}
    </div>
  )
}
