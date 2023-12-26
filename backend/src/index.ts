import express, { Express } from "express";
import dotenv from "dotenv";
import {
  API,
  BOARD,
  CARD,
  CHECKLISTITEM,
  COMMENT,
  LIST,
  USER,
} from "./constant";
import { authenticateToken } from "./middleware";
import User from "./routes/user";
import Board from "./routes/board";
import List from "./routes/list";
import Card from "./routes/card";
import Comment from "./routes/comment";
import ChecklistItem from "./routes/checkListItem";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(API + USER, User);
app.use(API + BOARD, authenticateToken, Board);
app.use(API + LIST, authenticateToken, List);
app.use(API + CARD, authenticateToken, Card);
app.use(API + COMMENT, authenticateToken, Comment);
app.use(API + CHECKLISTITEM, authenticateToken, ChecklistItem);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
