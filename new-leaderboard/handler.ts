import express from "serverless-express/express";
import handler from "serverless-express/handler";
import { getHtml } from "./leaderboard";

const app = express();

app.get("/leaderboard", (req, res) => {
  getHtml().then(html => res.send(html));
})

export const api = handler(app);