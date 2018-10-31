import { Progress } from './Progress';

export enum PlayerEventType {
  Start,
  End,
  Error,
  Progress,
  CodecData,
}



export interface StartEvent {
  type: PlayerEventType.Start;
  commandLine: string;
}

export interface EndEvent {
  type: PlayerEventType.End;
}

export interface ErrorEvent {
  type: PlayerEventType.Error;
  error: Error;
}

export interface CodecDataEvent {
  type: PlayerEventType.CodecData;
  codec: any;
}

export interface ProgressEvent {
  type: PlayerEventType.Progress;
  progress: Progress;
}

export type PlayerEvent = (
  | StartEvent
  | EndEvent
  | ErrorEvent
  | CodecDataEvent
  | ProgressEvent
);

export const start = (commandLine: string): StartEvent => ({
  type: PlayerEventType.Start,
  commandLine,
});

export const end = (): EndEvent => ({
  type: PlayerEventType.End,
});

export const error = (e: Error): ErrorEvent => ({
  type: PlayerEventType.Error,
  error: e,
});

export const codecData = (codec: any): CodecDataEvent => ({
  type: PlayerEventType.CodecData,
  codec,
});

export const progress = (p: Progress): ProgressEvent => ({
  type: PlayerEventType.Progress,
  progress: p,
});
