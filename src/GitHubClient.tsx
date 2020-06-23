import React, { useReducer } from 'react'
import { Redirect, Route, Link, Switch } from 'react-router-dom'
import { useCombobox } from 'downshift'
import debounce from 'lodash.debounce'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'
import { findLoginByName } from './helpers/common'
import { getOrganizationDetailPath } from './helpers/routes'
import { reducer, init, Actions, initialState } from './reducer'
import {
  IOrgQueryData,
  IOrgQueryVariables,
  IEdge,
  IOrganization,
} from './types'
import { GenericError } from './components/GenericError'
import { OrganizationResultsList } from './components/OrganizationResultsList'
import { OrganizationDetailView } from './components/OrganizationDetailView'
import { RepositoryDetailView } from './components/RepositoryDetailView'

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
            login
            description
            avatarUrl(size: 100)
          }
        }
      }
    }
  }
`)

const DEBOUNCE_DELAY = 250

export const GitHubClient: React.FC = () => {
  const client = useApolloClient()
  const [{ organizations, selectedOrganization, error }, dispatch] = useReducer(
    reducer,
    initialState,
    init
  )

  const searchQuery = async (
    inputValue?: string
  ): Promise<{ data: IOrgQueryData }> => {
    return client.query<IOrgQueryData, IOrgQueryVariables>({
      query: ORG_QUERY,
      variables: {
        first: 10,
        query: `${inputValue} type:org`,
      },
    })
  }

  const debouncedInputValueChange = debounce(
    async ({ inputValue, selectedItem }) => {
      if (selectedItem) {
        dispatch({
          type: Actions.SET_SELECTED_ORGANIZATION,
          payload: findLoginByName(organizations, selectedItem),
        })
      } else {
        try {
          const result = await searchQuery(inputValue)
          dispatch({
            type: Actions.UPDATE_ORGANIZATIONS_LIST,
            payload:
              inputValue && result.data.search.edges
                ? result.data.search.edges
                : [],
          })
        } catch (error) {
          dispatch({
            type: Actions.SET_ERROR_STATE,
            payload: true,
          })
        }
      }
    },
    DEBOUNCE_DELAY,
    { trailing: true }
  )

  const {
    isOpen,
    getMenuProps,
    reset,
    getLabelProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: organizations.map((edge: IEdge<IOrganization>) => edge.node.name),
    onInputValueChange: debouncedInputValueChange,
  })

  if (error) return <GenericError />

  return (
    <div className="container mx-auto" {...getComboboxProps()}>
      <Link
        to={'/'}
        onClick={() => {
          reset()
          dispatch({
            type: Actions.RESET,
            payload: initialState,
          })
        }}
      >
        <h2 className="font-display pb-1 pt-3 text-center">
          Awesome GitHub Client
        </h2>
      </Link>
      <label className="text-sm mb-2 text-gray-600 pb-2" {...getLabelProps()}>
        Search for a GitHub organization:
      </label>
      <div className="relative">
        <input
          type="text"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="e.g. Credit Karma"
          {...getInputProps({
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value === '') {
                reset()
              }
            },
          })}
        />
        <OrganizationResultsList
          isOpen={isOpen}
          organizations={organizations}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
        />
      </div>

      {selectedOrganization && (
        <Redirect to={getOrganizationDetailPath(selectedOrganization)} />
      )}

      <Switch>
        <Route
          exact
          path="/organization/:organizationLogin"
          render={() => <OrganizationDetailView />}
        />
        <Route
          exact
          path="/organization/:organizationLogin/repo/:repositoryName"
          render={() => <RepositoryDetailView />}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}
