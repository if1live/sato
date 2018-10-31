/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindPlayListItem
// ====================================================

export interface FindPlayListItem_node_Video {}

export interface FindPlayListItem_node_PlayListItem {
  id: string;
  videoId: string | null;
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

export interface Pagination_search_edges_node {
  id: string;
  videoId: string | null;
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
  edges: (Pagination_search_edges | null)[] | null;
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
// GraphQL mutation operation: PlayAudio
// ====================================================

export interface PlayAudio_playAudio {
  clientMutationId: string;
  ok: boolean | null;
}

export interface PlayAudio {
  playAudio: PlayAudio_playAudio | null;
}

export interface PlayAudioVariables {
  videoId: string;
  clientMutationId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StopAudio
// ====================================================

export interface StopAudio_stopAudio {
  clientMutationId: string;
}

export interface StopAudio {
  stopAudio: StopAudio_stopAudio | null;
}

export interface StopAudioVariables {
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
