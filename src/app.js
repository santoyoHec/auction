const express = require("express");
const { createServer } = require("http");
const helmet = require("helmet");
const router = require("./routes");
const errorHandler = require("./utils/errorHandler");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
require("./models/index");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  connectionStateRecovery: {},
  ackTimeout: 10000,
  pingTimeout: 3600000, // 24 horas
  pingInterval: 3600000,
  retries: 3,
  cors: {
    origin: "*",
    "Access-Control-Allow-Origin": "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
require("./socket/socket")(io);
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());

app.use(router);
app.get("/", (req, res) => {
  return res.send("Welcome to express!");
});

// middlewares después de las rutas
app.use(errorHandler);

app.get("/subastas", (req = request, res = response) => {
  return res.json([
    {
      id: "1",
      nombre: "subasta 1",
      complete: true,
      participando: true,
      estado: "en vivo",
    },
    {
      id: "2",
      nombre: "subasta 2",
      complete: false,
      participando: false,
      estado: "adjudicado",
    },
    {
      id: "3",
      nombre: "subasta 3",
      complete: true,
      participando: true,
      estado: "publicado",
    },
    {
      id: "4",
      nombre: "subasta 4",
      complete: false,
      participando: false,
      estado: "en vivo",
    },
    {
      id: "5",
      nombre: "subasta 5",
      complete: true,
      participando: true,
      progressMode: "determinate",
      estado: "adjudicado",
    },
    {
      id: "6",
      nombre: "subasta 6",
      complete: false,
      participando: false,
      progressMode: "indeterminate",
      estado: "publicado",
    },
  ]);
});

let data = [];

app.get("/subastas/:id", (req = request, res = response) => {
  console.log(req.params);
  const { id } = req.params;
  return res.json({ id, nombre: `subasta ${id}` });
});

module.exports = httpServer;
