import express from 'express';

export const setApp = (app: express.Application) => {
  app.use(express.static('../client/build'));
  app.use(express.static('client-build'));
};
