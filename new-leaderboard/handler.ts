import { getHtml } from "./leaderboard";

import express from "express";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import awsServerlessExpress from "aws-serverless-express";

const app = express();
const router = express.Router();

router.use(awsServerlessExpressMiddleware.eventContext());

router.get("/leaderboard", (req, res) => {
  getHtml().then(html => res.send(html));
})

router.get("/leaderboard/health_check", (req, res) => {
  res.send({"alive": true, "request": req.query});
})

app.use("/programming-competition/", router);

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
]

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
export const api = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}
