import express from "express";
import bodyParser from "body-parser";
// required to enable environment variables by dotenv lib.
import {} from "dotenv/config";
import mongoose from "./mongoose";
import appRouter from "./routes";
var cors = require('cors')



// Opening database connection
mongoose();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

app.get("/", (req, res) => {
  res.send("Welcome to ZICO messenger server!");
});

app.use("/v1", appRouter);
