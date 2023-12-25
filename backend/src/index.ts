import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import User from "./routes/user";
import { API, BOARD, USER } from "./constant";
import { authenticateToken } from "./middleware";
import Board from "./routes/board";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(API + USER, User);
app.use(API + BOARD, authenticateToken, Board);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
