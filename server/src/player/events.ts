import { Progress } from '@src/models/Progress';

export enum PlayerEventType {
  Start,
  End,
  Error,
  Progress,
  CodecData,
}

export interface BaseEvent {
  type: PlayerEventType;
}

export interface StartEvent extends BaseEvent {
  type: PlayerEventType.Start;
  commandLine: string;
}

export interface EndEvent extends BaseEvent {
  type: PlayerEventType.End;
}

export interface ErrorEvent extends BaseEvent {
  type: PlayerEventType.Error;
  error: Error;
}

export interface CodecDataEvent extends BaseEvent {
  type: PlayerEventType.CodecData;
  codec: any;
}

export interface ProgressEvent extends BaseEvent {
  type: PlayerEventType.Progress;
  progress: Progress;
}

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
