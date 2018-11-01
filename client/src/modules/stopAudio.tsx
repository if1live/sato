import gql from 'graphql-tag';
import { MutationFn, Mutation } from 'react-apollo';
import {
  StopAudioMutation,
  StopAudioMutationVariables,
} from '../schemaTypes';
import * as React from 'react';


export const stopAudioMutation = gql`
mutation StopAudioMutation($clientMutationId: ID!) {
  stopAudio(input: {
    clientMutationId: $clientMutationId,
  }) {
    clientMutationId
  }
}
`;

export interface WithStopAudioMutation {
  stopAudio: MutationFn<
  StopAudioMutation,
  StopAudioMutationVariables
  >;
}

interface Props {
  children: (data: WithStopAudioMutation) => JSX.Element | null;
}

export class StopAudio extends React.PureComponent<Props> {
  public render() {
    const { children } = this.props;

    return (
      <Mutation<StopAudioMutation, StopAudioMutationVariables>
        mutation={stopAudioMutation}
      >
        {(mutate) => {
          return children({
            stopAudio: mutate,
          });
        }}
      </Mutation>
    );
  }
}
