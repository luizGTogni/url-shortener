import express, { Request, Response } from "express";

const PORT = 8080;
const HOST = "http://localhost";

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ success: true });
});

app.listen(8080, () => console.log(`Server is running in ${HOST}:${PORT}`));