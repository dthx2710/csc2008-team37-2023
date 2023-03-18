import jsonServer from "json-server";
import express from "express";
import { createServer } from "http";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/data", (req, res) => {
  const data = req.body;
  router.db.get("data").push(data).write();
  res.json({ message: "Data added successfully" });
});

server.use(router);

const app = express();
app.use(server);
const httpServer = createServer(app);

httpServer.listen(3000, () => {
  console.log("JSON Server is running");
});
