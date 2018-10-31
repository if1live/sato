import express from 'express';
import sseWrapper, { EventData } from 'express-sse-middleware'; // tslint:disable-line
import cors from 'cors';
import { filter, map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { source$ } from './player/player';
import { PlayerEvent } from 'common/dist/models/PlayerEvents';


export const setApp = (app: express.Application) => {
  app.use(express.static('client-build'));

  app.use(sseWrapper);

  app.use(cors());

  // https://github.com/taqm/express-sse-sample/blob/master/src/index.ts
  // TODO grapqhl subscription으로 넘어갈까?

  app.get('/sse', (req, res) => {
    const sse = res.sse();

    const sub$ = source$
      .pipe(filter((ev) => true))
      .subscribe((ev) => {
        const evt: EventData<PlayerEvent> = {
          event: 'player',
          data: ev,
        };
        sse.send(evt);
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
