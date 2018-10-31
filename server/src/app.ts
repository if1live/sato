import express from 'express';
import sseWrapper from 'express-sse-middleware'; // tslint:disable-line
import { source$ } from './player/events';
import { filter, map } from 'rxjs/operators';
import { interval } from 'rxjs';


export const setApp = (app: express.Application) => {
  app.use(express.static('../client/build'));
  app.use(express.static('client-build'));

  app.use(sseWrapper);

  app.get('/sse', (req, res) => {
    const sse = res.sse();

    const sub$ = source$
      .pipe(filter((ev) => true))
      .subscribe((ev) => {
        const msg = JSON.stringify(ev);
        sse.send(msg);
      });

    // connection keep alive
    const conn$ = interval(10000)
      .subscribe(sse.keepAlive.bind(sse));

    req.on('close', () => {
      sub$.unsubscribe();
      conn$.unsubscribe();
    });
  });
};
