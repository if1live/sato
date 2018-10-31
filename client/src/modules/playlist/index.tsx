import gql from 'graphql-tag';

export const findPlayListItemQuery = gql`
query FindPlayListItem($id: ID!) {
  node(id: $id) {
    ... on PlayListItem {
      id
      videoId
    }
  }
}
`;

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

export const paginationQuery = gql`
query Pagination($first: Int, $after: String, $last: Int, $before: String) {
  search(first: $first, after: $after, last: $last, before: $before) {
    edges {
      cursor
      node {
        id
        videoId
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
`;

export const playAudioQuery = gql`
mutation PlayAudio($videoId: String!, $clientMutationId: ID!) {
  playAudio(input: {
    clientMutationId: $clientMutationId,
    videoId: $videoId,
  }) {
    clientMutationId,
    ok,
  }
}
`;

export const stopAudioQuery = gql`
mutation StopAudio($clientMutationId: ID!) {
  stopAudio(input: {
    clientMutationId: $clientMutationId,
  }) {
    clientMutationId
  }
}
`;



