import { Pagination_search_edges_node } from 'src/schemaTypes';
import * as React from 'react';
import { secondsToDisplay } from 'src/helpers';

interface Props {
  item: Pagination_search_edges_node;
}

export class PlayListItemComponent extends React.Component<Props> {
  private get video() {
    const { item } = this.props;
    return item.video;
  }

  private get videoId() {
    const { item } = this.props;
    return item.videoId;
  }

  private get title() {
    const video = this.video;
    return video ? video.title : this.videoId;
  }

  private get length() {
    const video = this.video;
    return video
      ? secondsToDisplay(parseInt(video.length_seconds, 10))
      : '?:??';
  }

  private onClick = () => {
    // TODO 해당 음악 재생하기
    console.log('todo');
  }

  public render() {
    return (
      <div onClick={this.onClick}>
      {/* 긴 문자열 대응하기*/}
        <span>{this.title}</span>
        <span>{this.length}</span>
      </div>
    );
  }
}
