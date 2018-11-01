import { portProd } from 'src/client';
import { PlayerEvents as events } from 'common';
import { Subject } from 'rxjs';

const sseUrl = `${location.protocol}//${location.hostname}:${portProd}/sse`;

const es = new EventSource(sseUrl);

export const play$ = new Subject<events.StartEvent>();
export const end$ = new Subject<events.EndEvent>();
export const error$ = new Subject<events.ErrorEvent>();
export const codecData$ = new Subject<events.CodecDataEvent>();
export const progress$ = new Subject<events.ProgressEvent>();

export const sseOpen$ = new Subject<MessageEvent>();
export const sseError$ = new Subject<MessageEvent>();
export const sseMessage$ = new Subject<MessageEvent>();

es.onmessage = (event) => sseMessage$.next(event);
es.onopen = (event) => sseOpen$.next(event);
es.onerror = (event) => sseError$.next(event);

es.addEventListener('player', (event: MessageEvent) => {
  const data = JSON.parse(event.data) as events.PlayerEvent;
  switch (data.type) {
    case events.PlayerEventType.Start:
      play$.next(data);
      break;
    case events.PlayerEventType.End:
      end$.next(data);
      break;
    case events.PlayerEventType.Error:
      error$.next(data);
      break;
    case events.PlayerEventType.Progress:
      progress$.next(data);
      break;
    case events.PlayerEventType.CodecData:
      codecData$.next(data);
      break;
    default:
      console.error(`unknown player event : ${event.data}`);
      break;
  }
});
