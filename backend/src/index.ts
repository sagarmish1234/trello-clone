import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import User from "./routes/user";
import { API, USER } from "./constant";
import { authenticateToken } from "./middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(API + USER, User);
app.get("/", authenticateToken, (req: Request, res: Response) => {
  res.send("Authenticated user");
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
