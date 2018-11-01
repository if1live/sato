import * as React from 'react';
import { Pagination_search_edges_node } from 'src/schemaTypes';
import { PlayListItemComponent } from './PlayListItemComponent';
import { List } from 'semantic-ui-react';


interface Props {
  items: Pagination_search_edges_node[];
}

export class PlayListComponent extends React.Component<Props> {
  public render() {
    const { items } = this.props;
    return (
      <List divided verticalAlign="middle">
        {items.map((item, idx) => {
          return (
            <PlayListItemComponent key={item.videoId} item={item} />
          );
        })}
      </List>
    );
  }
}


