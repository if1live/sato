import gql from 'graphql-tag';

export const findVideoQuery = gql`
query FindVideo($id: ID!) {
  node(id: $id) {
    ... on Video {
      id
      video_id
      title
    }
  }
}
`;
