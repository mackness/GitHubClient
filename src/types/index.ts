export interface IOrganization {
  avatarUrl: string
  id: string
  name: string
  login: string
  description: string
}

export interface IEdge<KNode> {
  cursor: string
  node: KNode
}

export interface IOrgQueryData {
  search: {
    edges: IEdge<IOrganization>[]
  }
}

export interface IOrgQueryVariables {
  first: number
  query: string
  cursor?: string
}

export interface ILanguage {
  name: string
  color: string
}

export interface IRepository {
  description: string
  forkCount: number
  name: string
  openGraphImageUrl: string
  languages: {
    edges: IEdge<ILanguage>[]
  }
  stargazers: {
    totalCount: number
  }
}

export interface IOrgDetailQueryData {
  organization: {
    repositories: {
      edges: IEdge<IRepository>[]
    }
  }
}

export interface IOrgDetailQueryVariables {
  login: string
}

export interface ICommit {
  oid: string
  url: string
  messageHeadline: string
  committedDate: string
}

export interface IRepoDetailQueryData {
  repository: {
    name: string
    createdAt: string
    description: string
    homepageUrl: string
    languages: {
      edges: IEdge<ILanguage>[]
    }
    object: {
      history: {
        nodes: ICommit[]
      }
    }
  }
}

export interface IRepoDetailQueryVariables {
  owner: string
  name: string
}
