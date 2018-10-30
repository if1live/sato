// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    node: Node | null;
    viewer: IViewer | null;
  }

  interface INodeOnQueryArguments {
    id: string;
  }

  type Node = IAudio | IPlayListItem;

  interface INode {
    __typename: 'Node';
    id: string;
  }

  interface IViewer {
    __typename: 'Viewer';
    randomAudio: IAudio | null;
  }

  interface IAudio {
    __typename: 'Audio';
    id: string;
    audioId: string | null;
    title: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    playAudio: IPlayAudioPayload | null;
    stopAudio: IStopAudioPayload | null;
  }

  interface IPlayAudioOnMutationArguments {
    input?: IPlayAudioInput | null;
  }

  interface IStopAudioOnMutationArguments {
    input?: IStopAudioInput | null;
  }

  interface IPlayAudioInput {
    clientMutationId: string;
    audioId: string;
  }

  interface IPlayAudioPayload {
    __typename: 'PlayAudioPayload';
    clientMutationId: string;
  }

  interface IStopAudioInput {
    clientMutationId: string;
  }

  interface IStopAudioPayload {
    __typename: 'StopAudioPayload';
    clientMutationId: string;
  }

  interface IPageInfo {
    __typename: 'PageInfo';
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  }

  interface IPlayListItem {
    __typename: 'PlayListItem';
    id: string;
    audioId: string | null;
  }
}

// tslint:enable
