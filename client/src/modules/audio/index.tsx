import gql from 'graphql-tag';

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



