import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { ViewPagination } from './modules/playlist';

import {
  PlayListComponent,
  ControlComponent,
  ProgressBarComponent,
  CodecComponent,
} from './components';

class App extends React.Component {
  public render() {
    // TODO 플레이 리스트의 페이지네이션은 나중에 생각해도 된다
    return (
      <div>
        <h1>sato</h1>
        <ProgressBarComponent />
        <CodecComponent />
        <ControlComponent />
        <ViewPagination first={10000}>
          {(data) => {
            const nodes = data.search.edges.map((x) => x.node);
            return (
              <PlayListComponent items={nodes} />
            );
          }}
        </ViewPagination>
      </div>
    );
  }
}

export default App;
