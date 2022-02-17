import express from "express";

import { config } from "./config/Constants";
import { URLController } from "./controller/URLController";

const urlController = new URLController();

const app = express();

app.use(express.json());

app.post('/shorten', urlController.shorten);
app.get('/:hash', urlController.redirect);

app.listen(8080, () => {
  console.log(`Server is running in ${config.API_URL}:${config.PORT}`)
});