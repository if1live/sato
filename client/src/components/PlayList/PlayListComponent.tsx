import * as React from 'react';
import { Pagination_search_edges_node } from 'src/schemaTypes';
import { PlayListItemComponent } from './PlayListItemComponent';


interface Props {
  items: Pagination_search_edges_node[];
}

export class PlayListComponent extends React.Component<Props> {
  public render() {
    const { items } = this.props;
    return (
      <ol>
        {items.map((item, idx) => {
          return (
            <li key={item.videoId}>
              <PlayListItemComponent item={item} />
            </li>
          );
        })}
      </ol>
    );
  }
}


