import gql from 'graphql-tag';

export const findPlayListItem = gql`
query FindPlayListItem($id: ID!) {
  node(id: $id) {
    ... on PlayListItem {
      id
      audioId
    }
  }
}
`;

export const findVideo = gql`
query FindVideo($id: ID!) {
  node(id: $id) {
    ... on Video {
      id
      title
    }
  }
}
`;
