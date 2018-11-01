import gql from 'graphql-tag';
import {
  PlayAudioMutation,
  PlayAudioMutationVariables,
} from '../schemaTypes';
import { MutationFn, Mutation } from 'react-apollo';
import * as React from 'react';



export const playAudioMutation = gql`
mutation PlayAudioMutation($videoId: String!, $clientMutationId: ID!) {
  playAudio(input: {
    clientMutationId: $clientMutationId,
    videoId: $videoId,
  }) {
    clientMutationId,
    ok,
  }
}
`;

export interface WithPlayAudioMutation {
  playAudio: MutationFn<
  PlayAudioMutation,
  PlayAudioMutationVariables
  >;
}

interface Props {
  children: (data: WithPlayAudioMutation) => JSX.Element | null;
}

export class PlayAudio extends React.PureComponent<Props> {
  public render() {
    const { children } = this.props;

    return (
      <Mutation<PlayAudioMutation, PlayAudioMutationVariables>
        mutation={playAudioMutation}
      >
        {(mutate) => {
          return children({
            playAudio: mutate,
          });
        }}
      </Mutation>
    );
  }
}
