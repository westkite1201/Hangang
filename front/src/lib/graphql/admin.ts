import gql from 'graphql-tag';
export const GET_POST_LIST = gql`
  query Posts(
    $cursor: ID
    $username: string
    $temp_only: Boolean
    $tag: string
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

export interface Quote{
   _id : string,
  NAME : string,
  WORD : string,
  THUMBNAIL_USER_IMAGE : string ,
  THUMBNAIL_BACKGROUND_IMAGE : string,
  ACCEPTED : string,
}
export interface Quotes{
  quotes:Quote[]
}


// 넘겨받은 변수 사용시에 $variable 사용
export const GET_QUOTES = gql`
  query Quotes($status: String!){
    quotes(status: $status) {
        _id,
        NAME,
        WORD,
        THUMBNAIL_USER_IMAGE,
        THUMBNAIL_BACKGROUND_IMAGE,
        CARD_EXPS_TYP_CD,
        ACCEPTED,
    }
  }
`

// 넘겨받은 변수 사용시에 $variable 사용
export const EDIT_QUOTES = gql`
  mutation EditQuotes($id: String! , $name: String!,$word : String!){
    editQuotes(id : $id, name: $name, word : $word) {
        NAME,
        WORD,
        THUMBNAIL_USER_IMAGE,
        THUMBNAIL_BACKGROUND_IMAGE,
        ACCEPTED,
    }
  }
`