import gql from 'graphql-tag';
import * as React from 'react';
import { Pagination, PaginationVariables } from 'src/schemaTypes';
import { Query } from 'react-apollo';

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

interface Props {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  children: (data: Pagination) => JSX.Element | null;
}

export class ViewPagination extends React.PureComponent<Props> {
  public render() {
    const { children } = this.props;
    return (
      <Query<Pagination, PaginationVariables>
        query={paginationQuery}
        variables={this.props}>
        {({ loading, error, data }) => {
          if (loading) { return <div>loading...</div>; }
          if (error) { return <div>error</div>; }
          if (!data) { return <div>blank data</div>; }
          return children(data);
        }}
      </Query>
    );
  }
}
