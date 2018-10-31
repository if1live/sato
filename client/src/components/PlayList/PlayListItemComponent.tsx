import { Pagination_search_edges_node } from 'src/schemaTypes';
import * as React from 'react';
import { secondsToDisplay } from 'src/helpers';

interface Props {
  item: Pagination_search_edges_node;
}

export class PlayListItemComponent extends React.Component<Props> {
  public render() {
    const { item } = this.props;
    const { video } = item;

    if (video) {
      return (
        <dl>
          <dt>video id</dt>
          <dd>{item.videoId}</dd>
          <dt>title</dt>
          <dd>{video.title}</dd>
          <dt>seconds</dt>
          <dd>{secondsToDisplay(parseInt(video.length_seconds, 10))}</dd>
        </dl>
      );

    } else {
      return (
        <div>
          {item.videoId}
        </div>
      );
    }
  }
}
