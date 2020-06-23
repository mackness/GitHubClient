import { isDevelopment } from '../helpers/environment'
import { IOrganization, IEdge } from '../types'

export interface IGitHubClientState {
  searchTerm: string
  selectedOrganization: string
  organizations: IEdge<IOrganization>[] | []
  error: boolean
}

export enum Actions {
  UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM',
  UPDATE_ORGANIZATIONS_LIST = 'UPDATE_ORGANIZATIONS_LIST',
  SET_SELECTED_ORGANIZATION = 'SET_SELECTED_ORGANIZATION',
  SET_ERROR_STATE = 'SET_ERROR_STATE',
  RESET = 'RESET',
}

export interface IAction<KPayload> {
  type: string
  payload: KPayload
}

export interface IUpdateSearchTermAction extends IAction<string> {
  type: Actions.UPDATE_SEARCH_TERM
}

export interface IUpdateOrganizationListAction
  extends IAction<IEdge<IOrganization>[] | []> {
  type: Actions.UPDATE_ORGANIZATIONS_LIST
}

export interface ISetSelectedOrganizationAction extends IAction<string> {
  type: Actions.SET_SELECTED_ORGANIZATION
}

export interface ISetErrorStateAction extends IAction<boolean> {
  type: Actions.SET_ERROR_STATE
}

export interface IResetAction extends IAction<IGitHubClientState> {
  type: Actions.RESET
}

export type GitHubClientActions =
  | IUpdateSearchTermAction
  | IUpdateOrganizationListAction
  | ISetSelectedOrganizationAction
  | ISetErrorStateAction
  | IResetAction

export const initialState: IGitHubClientState = {
  searchTerm: '',
  organizations: [],
  selectedOrganization: '',
  error: false,
}

export function init(): IGitHubClientState {
  return initialState
}

export function reducer(state: any, action: GitHubClientActions) {
  switch (action.type) {
    case Actions.UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      }
    case Actions.UPDATE_ORGANIZATIONS_LIST:
      return {
        ...state,
        organizations: action.payload,
      }
    case Actions.SET_SELECTED_ORGANIZATION:
      return {
        ...state,
        selectedOrganization: action.payload,
      }
    case Actions.SET_ERROR_STATE:
      return {
        ...state,
        error: action.payload,
      }
    case Actions.RESET:
      return init()
    default:
      const badAction: never = action
      if (isDevelopment()) throw new Error(`Uknown action type: ${badAction}`)
  }
}
