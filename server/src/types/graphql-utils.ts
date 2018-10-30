import * as express from 'express';

export interface Context {
  url: string;
  req: express.Request;
  res: express.Response;
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
