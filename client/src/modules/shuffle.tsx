import gql from 'graphql-tag';
import * as React from 'react';
import { MutationFn, Mutation } from 'react-apollo';
import {
  ShuffleMutation,
  ShuffleMutationVariables,
} from '../schemaTypes';

export const shuffleMutation = gql`
mutation ShuffleMutation($clientMutationId: ID!) {
  shuffle(input: {
    clientMutationId: $clientMutationId,
  }) {
    clientMutationId
  }
}
`;

export interface WithShuffleMutation {
  shuffle: MutationFn<
  ShuffleMutation,
  ShuffleMutationVariables
  >;
}

interface Props {
  children: (data: WithShuffleMutation) => JSX.Element | null;
}

export class Shuffle extends React.PureComponent<Props> {
  public render() {
    const { children } = this.props;

    return (
      <Mutation<ShuffleMutation, ShuffleMutationVariables>
        mutation={shuffleMutation}
      >
        {(mutate) => {
          return children({ shuffle: mutate });
        }}
      </Mutation>
    );
  }
}
