import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { PlayerEvents as events } from 'common';

import { ApolloProvider } from 'react-apollo';
import { client, host, portProd } from './client';
import { findPlayListItemQuery } from './modules/playlist';
import { FindPlayListItemVariables } from './schemaTypes';

// graphql sample
const samplefunc = async () => {
  const id = 'UGxheUxpc3RJdGVtOkpPVXloRS05YkJz';
  const resp = await client.query({
    query: findPlayListItemQuery,
    variables: {
      id,
    } as FindPlayListItemVariables,
  });
  // const data = resp.data as findplaylist;
  const data = resp.data;
  console.log(data);
};
samplefunc();

// sse
// TODO host는
const es = new EventSource(`${host}:${portProd}/sse`);
es.onmessage = (event) => {
  console.log('onmessage');
  console.log(event);
};
es.onopen = (event) => {
  console.log('open');
  console.log(event);
};
es.onerror = (event) => {
  console.log('error');
  console.log(event);
};
es.addEventListener('player', (event: MessageEvent) => {
  const data = JSON.parse(event.data) as events.PlayerEvent;
  switch (data.type) {
    case events.PlayerEventType.Start:
      console.log('play');
      break;
    case events.PlayerEventType.End:
      console.log('end');
      break;
    case events.PlayerEventType.Error:
      const e = data as events.ErrorEvent;
      console.log('error');
      console.log(e.error);
      break;
    case events.PlayerEventType.Progress:
      const e1 = data as events.ProgressEvent;
      console.log('progress');
      console.log(e1.progress);
      break;
    case events.PlayerEventType.CodecData:
      const e2 = data as events.CodecDataEvent;
      console.log('codec');
      console.log(e2.codec);
      break;
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
