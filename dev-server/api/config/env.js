import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export function setEnvironment(app) {
  if (process.env.NODE_ENV != 'production') {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}

function setDevEnv(app) {
  console.log("setting the development environment");
  app.use(morgan('dev')); // logs all requests to the api
  app.use(cors());
}

function setProdEnv(app) {
  console.log("setting the production environment");
}