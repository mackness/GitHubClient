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
import { LanguagePills } from './LanguagePills'

const REPO_DETAIL_QUERY = gql(`
  query RepositoryDetailQuery($name: String!, $owner: String!) {
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
              url
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
    <div className="flex flex-col-reverse divide-y divide-y-reverse divide-gray-400">
      {commits.map(({ oid, messageHeadline, committedDate, url }: ICommit) => (
        <React.Fragment key={oid}>
          <div className="mb-4 pb-3">
            <p>
              <b>commit:</b>{' '}
              <a href={url} className="text-blue">
                {oid}
              </a>
            </p>
            <p>
              <b>message:</b> {messageHeadline}
            </p>
            <p>
              <b>date:</b>
              {`
                ${new Date(committedDate).toLocaleDateString()}
                ${new Date(committedDate).toLocaleTimeString()} 
              `}
            </p>
          </div>
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
      <header className="mb-3">
        <h1 className="text-3xl">{name}</h1>
        <h4 className="text-lg">{description}</h4>
      </header>
      <h4 className="text-3xl">Languages:</h4>
      <LanguagePills languages={languages.edges} />
      <h4 className="text-3xl">Commit Log:</h4>
      {object && <CommitLog commits={object.history.nodes} />}
    </div>
  )
}
