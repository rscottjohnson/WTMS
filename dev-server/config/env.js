import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

export function setEnvironment(app) {
  if (process.env.NODE_ENV !== 'production') {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}

function setDevEnv(app) {
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = 'mongodb://localhost:27017/wtms-db'; // set a url for the database connection
  app.use(bodyParser.json());
  app.use(morgan('dev')); // logs all requests to the api
  app.use(cors());
}

function setProdEnv(app) {
  process.env.DB_URL = 'mongodb://localhost:27017/prod-db'; // set a url for the database connection
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../dist')); // serves build folder as static content
}