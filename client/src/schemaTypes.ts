/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PlayAudioMutation
// ====================================================

export interface PlayAudioMutation_playAudio {
  clientMutationId: string;
  ok: boolean | null;
}

export interface PlayAudioMutation {
  playAudio: PlayAudioMutation_playAudio | null;
}

export interface PlayAudioMutationVariables {
  videoId: string;
  clientMutationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StopAudioMutation
// ====================================================

export interface StopAudioMutation_stopAudio {
  clientMutationId: string;
}

export interface StopAudioMutation {
  stopAudio: StopAudioMutation_stopAudio | null;
}

export interface StopAudioMutationVariables {
  clientMutationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindPlayListItem
// ====================================================

export interface FindPlayListItem_node_Video {}

export interface FindPlayListItem_node_PlayListItem {
  id: string;
  videoId: string;
}

export type FindPlayListItem_node = FindPlayListItem_node_Video | FindPlayListItem_node_PlayListItem;

export interface FindPlayListItem {
  node: FindPlayListItem_node | null;
}

export interface FindPlayListItemVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindVideo
// ====================================================

export interface FindVideo_node_PlayListItem {}

export interface FindVideo_node_Video {
  id: string;
  video_id: string;
  title: string;
}

export type FindVideo_node = FindVideo_node_PlayListItem | FindVideo_node_Video;

export interface FindVideo {
  node: FindVideo_node | null;
}

export interface FindVideoVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Pagination
// ====================================================

export interface Pagination_search_edges_node_video {
  title: string;
  length_seconds: string;
}

export interface Pagination_search_edges_node {
  id: string;
  videoId: string;
  video: Pagination_search_edges_node_video | null;
}

export interface Pagination_search_edges {
  cursor: string;
  node: Pagination_search_edges_node;
}

export interface Pagination_search_pageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Pagination_search {
  edges: Pagination_search_edges[];
  pageInfo: Pagination_search_pageInfo;
}

export interface Pagination {
  search: Pagination_search;
}

export interface PaginationVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ShuffleMutation
// ====================================================

export interface ShuffleMutation_shuffle {
  clientMutationId: string;
}

export interface ShuffleMutation {
  shuffle: ShuffleMutation_shuffle;
}

export interface ShuffleMutationVariables {
  clientMutationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
