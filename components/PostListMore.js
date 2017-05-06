import React from 'react';
import { gql, graphql } from 'react-apollo'

const POSTS_PER_PAGE = 10;

function PostListMore ({ data }) {
    return (
        <div>Data is fetched</div>
    )
}

const allPosts = gql`
  query allPosts2 {
    allPosts {
      id
      title
      votes
      url
      createdAt
    },
    _allPostsMeta {
      count
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts)(PostListMore)
