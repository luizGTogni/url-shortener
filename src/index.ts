import express from "express";

import { config } from "./config/Constants";

import { MongoConnection } from "./database/MongoConnection";
import { URLController } from "./controller/URLController";

const app = express();
app.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();

app.get('/list/all', urlController.listAll);
app.get('/list/:title', urlController.list);
app.get('/:hash', urlController.redirect);
app.post('/shorten', urlController.shorten);

app.listen(8080, () => {
  console.log(`Server is running in ${config.API_URL}:${config.PORT}`)
});