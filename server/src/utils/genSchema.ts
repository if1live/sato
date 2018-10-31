import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import * as path from 'path';
import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as glob from 'glob';
import _ from 'lodash';

import { resolvers as shared } from '../modules/shared/resolvers';
import { resolvers as audio } from '../modules/audio/resolvers';
import { resolvers as video } from '../modules/video/resolvers';
import { resolvers as playlist } from '../modules/playlist/resolvers';

const allResolvers = [shared, audio, video, playlist];

const rootPath = path.join(__dirname, '../../src');

const pathsToModules: string[] = [
  path.join(rootPath, 'modules/shared'),
  path.join(rootPath, 'modules/audio'),
  path.join(rootPath, 'modules/video'),
  path.join(rootPath, 'modules/playlist'),
];

const typeDefsFileName = 'api.gql';

const findGraphqlTypes = (pathToModules: string) => {
  return glob
    .sync(`${pathToModules}/**/*.gql`)
    .map((x) => fs.readFileSync(x, { encoding: 'utf8' }));
};

// 아래의 코드가 살아있으면 webpack build에서 경고가 뜬다
// WARNING in ./src/utils/genSchema.ts 35:73-90
// Critical dependency: the request of a dependency is an expression
// 자동 검색은 포기하고 수동으로 import 쓰자
// const findResolvers = (pathToModules: string) => {
// 	return glob
// 		.sync(`${pathToModules}/**/resolvers.?s`)
// 		.map((resolver) => require(resolver).resolvers);
// };

const loadGraphqlTypes = () => {
  const graphqlTypesList = pathsToModules.map(findGraphqlTypes);
  const graphqlTypes = graphqlTypesList.reduce((x, y) => x.concat(y), []);
  return graphqlTypes;
};

export const genSchema = () => {
  const graphqlTypes = loadGraphqlTypes();

  // const resolversList = pathsToModules.map(findResolvers);
  // const resolvers = resolversList.reduce((x, y) => x.concat(y), []);
  // resolvers: mergeResolvers(resolvers),

  // 전체가 합쳐진 스키마도 저장
  // 클라이언트 같은곳에서 쓸거같아서
  fs.writeFileSync(typeDefsFileName, mergeTypes(graphqlTypes));

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(allResolvers),
  });
};

export const loadSchema = () => {
  let graphqlTypes: string[];
  if (process.env.NODE_ENV === 'production') {
    // 배포의 경우 합쳐진 스키마를 쓰는게 편하다
    // api.gql만 넣어도 되니까
    const schema = fs.readFileSync(typeDefsFileName);
    graphqlTypes = [schema.toString()];

  } else {
    graphqlTypes = loadGraphqlTypes();
  }

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(allResolvers),
  });
};
