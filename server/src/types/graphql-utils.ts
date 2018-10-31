import * as express from 'express';
import { VideoInfoLoader } from '../loaders';

export interface Context {
  url: string;
  req: express.Request;
  res: express.Response;
  loaders: Loaders;
}

export interface Loaders {
  videoInfo: VideoInfoLoader;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any,
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any,
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
