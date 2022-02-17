import shortID from "shortid";
import { Request, Response } from "express";

import { config } from "../config/Constants";
import { URLModel } from "../database/model/URL";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<Response> {
    let { title, originURL, hash } = req.body;

    if (title === "") {
      return res.status(400).json({ error: "Mandatory title field!" });
    }

    if (hash === "") {
      hash = shortID.generate();
    }

    const hasURLByHash = await URLModel.findOne({ hash });
    const shortURL = `${config.API_URL}:${config.PORT}/${hash}`;

    if (hasURLByHash) {
      return res.status(400).json({ error: "Hash already exists!" });
    }

    const hasURLByTitle = await URLModel.findOne({ title });

    if (hasURLByTitle) {
      return res.status(400).json({ error: "Title already exists!" });
    }

    const url = await URLModel.create({ title, hash, originURL });

    return res.json({ id: url._id, title, hash, originURL, shortURL });
  }

  public async redirect(req: Request, res: Response): Promise<void | Response> {
    const { hash } = req.params;
    const hasURL = await URLModel.findOne({ hash });

    if (hasURL) {
      return res.redirect(hasURL.originURL);
    }

    return res.status(404).json({ error: "URL not found!" });
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const { title } = req.params;
    const url = await URLModel.findOne({ title });

    if (url) {
      return res.json({
        id: url._id, title,
        hash: url.hash,
        originURL: url.originURL,
        shortURL: `${config.API_URL}:${config.PORT}/${url.hash}`,
      });
    }

    return res.status(404).json({ error: "No custom URL found!" });
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const urls = await URLModel.find();

    if (urls.length === 0) {
      return res.status(404).json({ error: "No custom URL found!" });
    }

    const data = urls.map(url => {
      return {
        id: url._id,
        title: url.title,
        hash: url.hash,
        originURL: url.originURL,
        shortURL: `${config.API_URL}:${config.PORT}/${url.hash}`,
      }
    });

    return res.json(data);
  }
}