import { IEdge, IOrganization } from '../types'

export function findLoginByName(organizations: any, name: string): string {
  return organizations.find((edge: IEdge<IOrganization>) => {
    return edge.node.name === name
  })?.node?.login
}
