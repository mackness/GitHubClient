# GitHub Client

A simple UI to explore GitHub organizations and repositories built on top of the GraphQL API.

### Setup

Clone the respoitory:

```
git clone https://github.com/mackness/GitHubClient.git
```

Install dependencies

```
cd GitHubClient && yarn
```

Add REACT_APP_GITHUB_API_TOKEN to a .env file

```
echo REACT_APP_GITHUB_API_TOKEN=[YOUR API TOKEN] > .env
```

Start the development server

```
yarn start
```

Notes:

I decided to use [Create React App](https://github.com/facebook/create-react-app) to spend as little time as posible on setup and configuraton. My goal was to start writing application code as soon as possible.

I knew I wanted to have the GitHub API populate a dropdown with organizations. Rather than write that component myself from scratch I decided to use a library called [Downshift](https://www.downshift-js.com/downshift/) written by the great Kent C. Dodds. Downshift abstracts a lot of complex functionality and is accessible out of the box.

I wated to take this opportunity to get my feet wet with [Tailwind CSS](https://tailwindcss.com/). This is the first time I've used it and there was a small learning curve but the utitlity class approach is very interesting and I will definitley continue exploring this lib.

My main goal was to be as feature complete as possible and unfortunatley I ran out of time before having the opportunity to write tests. Given more time I would use Jest and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to write a few unit tests for the GithubClient, OrganizationDetailView, and RespositoryDetailView components.

I enjoyed learning about Github's GraphQL API they have done a great good job making the documentation digestable and easy to follow.
