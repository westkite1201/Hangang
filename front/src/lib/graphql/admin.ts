import gql from 'graphql-tag';
export const GET_POST_LIST = gql`
  query Posts(
    $cursor: ID
    $username: String
    $temp_only: Boolean
    $tag: String
    $limit: Int
  ) {
    posts(
      cursor: $cursor
      username: $username
      temp_only: $temp_only
      tag: $tag
      limit: $limit
    ) {
      id
      title
      short_description
      thumbnail
      user {
        id
        username
        profile {
          id
          thumbnail
        }
      }
      url_slug
      released_at
      updated_at
      comments_count
      tags
      is_private
      likes
    }
  }
`;
// 넘겨받은 변수 사용시에 $variable 사용
export const GET_QUOTES = gql`
  query Quotes($status: String!){
    quotes(status: $status) {
        NAME,
        WORD
    }
  }
`