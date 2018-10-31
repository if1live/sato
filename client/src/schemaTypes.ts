/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindPlayListItem
// ====================================================

export interface FindPlayListItem_node_Video {}

export interface FindPlayListItem_node_PlayListItem {
  id: string;
  audioId: string | null;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
