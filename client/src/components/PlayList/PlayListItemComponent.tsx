import { Pagination_search_edges_node } from 'src/schemaTypes';
import * as React from 'react';
import { secondsToDisplay } from 'src/helpers';
import { List, Button } from 'semantic-ui-react';

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

  private onPlayClick = () => {
    console.log(`todo play ${this.videoId} audio`);
  }

  private onYoutubeClick = () => {
    const url = `https://www.youtube.com/watch?v=${this.videoId}`;
    const win = window.open(url, '_blank');
    if (win) { win.focus(); }
  }



  public render() {
    // 긴 문자열 대응하기*
    return (
      <List.Item>
        <List.Content floated="right">
          <Button.Group basic>
            <Button onClick={this.onPlayClick} icon="play" />
            <Button onClick={this.onYoutubeClick} icon="youtube" />
          </Button.Group>
        </List.Content>
        <List.Content>
          <List.Header>{this.title}</List.Header>
          <span>{this.length}</span>
        </List.Content>
      </List.Item >
    );
  }
}
