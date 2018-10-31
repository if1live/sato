import gql from 'graphql-tag';

export const findPlayListItemQuery = gql`
query FindPlayListItem($id: ID!) {
  node(id: $id) {
    ... on PlayListItem {
      id
      audioId
    }
  }
}
`;

export const findVideoQuery = gql`
query FindVideo($id: ID!) {
  node(id: $id) {
    ... on Video {
      id
      title
    }
  }
}
`;

export const searchQuery = gql`
query Search {
  search {
    edges {
      cursor
      node {
        id
        audioId
      }
    }
  }
}
`;

