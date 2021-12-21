import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { loaderEnviroment } from "./config";
import { loader } from "./loaders";
import { createServer } from "http";
import { AppRouter } from "./routers";
const app = express();
const server = createServer(app);
loaderEnviroment();
// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
loader();
AppRouter(app);
app.use(function notFoundHandler(_req, res) {
  res.status(404).send({
    message: "Not Found",
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
