import { serverOption, server } from './server';

const port = 3100;

const main = async () => {
  const option = { ...serverOption, port };
  const app = await server.start(option);
  console.log(`run server ${port}`);
  return app;
};

main();
