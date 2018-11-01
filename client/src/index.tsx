import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { client } from './client';
// import { findPlayListItemQuery } from './modules/';
// import { FindPlayListItemVariables } from './schemaTypes';

// graphql sample
// const samplefunc = async () => {
//   const id = 'UGxheUxpc3RJdGVtOkpPVXloRS05YkJz';
//   const resp = await client.query({
//     query: findPlayListItemQuery,
//     variables: {
//       id,
//     } as FindPlayListItemVariables,
//   });
//   // const data = resp.data as findplaylist;
//   const data = resp.data;
//   console.log(data);
// };
// samplefunc();

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
