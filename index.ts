import express from "express";
import { config } from "dotenv";
config();

const App = express();

App.get("/", (req, res) => {
  return res.send("Hello World");
});

App.listen(3000, () => {
  console.log("Server listening A Port 3000");
});
export default App;
