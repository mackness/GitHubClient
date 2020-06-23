export function getOrganizationDetailPath(organizationLogin: string): string {
  return `/organization/${encodeURIComponent(organizationLogin)}`
}

export function getRepositoryDetailPath(
  organizationLogin: string,
  repoName: string
): string {
  return `${getOrganizationDetailPath(
    organizationLogin
  )}/repo/${encodeURIComponent(repoName)}`
}
