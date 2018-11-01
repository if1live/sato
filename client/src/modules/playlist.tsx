import gql from 'graphql-tag';
import { Pagination, PaginationVariables } from 'src/schemaTypes';
import * as React from 'react';
import { Query } from 'react-apollo';

export const paginationQuery = gql`
query Pagination($first: Int, $after: String, $last: Int, $before: String) {
  search(first: $first, after: $after, last: $last, before: $before) {
    edges {
      cursor
      node {
        id
        videoId
        video {
          title
          length_seconds
        }
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


// TODO 이름 좋은거 뭐 없나
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
