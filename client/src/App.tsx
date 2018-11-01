import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

// import logo from './logo.svg';
import { ViewPagination } from './modules/playlist';

import {
  PlayListComponent,
  ControlComponent,
  ProgressBarComponent,
  CodecComponent,
} from './components';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ProgressBarComponent />
        <CodecComponent />
        <ControlComponent />
        <ViewPagination first={10}>
          {(data) => {
            const nodes = data.search.edges.map((x) => x.node);
            return (
              <PlayListComponent items={nodes} />
            );
          }}
        </ViewPagination>

        {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        */}
      </div>
    );
  }
}

export default App;
