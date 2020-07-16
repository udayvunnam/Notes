Important defaults - https://github.com/tannerlinsley/react-query/blob/master/docs/src/pages/docs/guides/important-defaults.md

- 'loading' only on initial render of the query
- Even though it fetches in background there wont be a loading state
- Rather it fetches compares to previous data and avoids additional render if data didn't change
- if we want to take that background fetching as well use 'useFetching'
- Config can be provided at global level and query level
