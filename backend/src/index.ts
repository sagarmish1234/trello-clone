import express, { Express } from "express";
import dotenv from "dotenv";
import { API, BOARD, LIST, USER } from "./constant";
import { authenticateToken } from "./middleware";
import User from "./routes/user";
import Board from "./routes/board";
import List from "./routes/list";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(API + USER, User);
app.use(API + BOARD, authenticateToken, Board);
app.use(API + LIST, authenticateToken, List);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
