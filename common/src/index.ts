// https://michalzalecki.com/creating-typescript-library-with-a-minimal-setup/
export function sum(a: number, b: number) {
  return a + b;
}

import { Progress } from './models/Progress';
import * as PlayerEvents from './models/PlayerEvents';

export {
  Progress,
  PlayerEvents,
};
