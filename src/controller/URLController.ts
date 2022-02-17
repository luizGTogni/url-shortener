import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortID from "shortid";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;
    const hashGen = shortID.generate();
    const shortURL = `${config.API_URL}:${config.PORT}/${hashGen}`;

    res.json({ originURL, hashGen, shortURL });
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const url = {
      "originURL": "https://web.whatsapp.com/",
      "hashGen": "gSloyILw_",
      "shortURL": "http://localhost:8080/gSloyILw_"
    }

    res.redirect(url.originURL);
  }
}