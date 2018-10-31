import { Pagination_search_edges_node } from 'src/schemaTypes';
import * as React from 'react';

interface Props {
  item: Pagination_search_edges_node;
}

export class PlayListItemComponent extends React.Component<Props> {
  public render() {
    const { item } = this.props;
    return (
      <div>
        {item.videoId}
      </div>
    );
  }
}
