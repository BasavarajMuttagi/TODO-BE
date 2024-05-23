import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { AuthRouter } from "./src/routes/auth.route";
import { TodoRouter } from "./src/routes/todo.route";
config();
export const DB_SECRET = process.env.DB_SECRET as string;
const App = express();
App.use(cors());
App.use(express.json());
App.get("/", (req, res) => {
  return res.send("Hello World");
});

App.use("/auth", AuthRouter);
App.use("/todo", TodoRouter);

App.listen(3000, () => {
  console.log("Server listening A Port 3000");
});
export default App;
