const dotenv = require("dotenv");
dotenv.config();
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./data.model.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://klp-neon.vercel.app"],
  }),
);

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DataBase Connected Successfully");
}
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/set-data", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return res.status(401).json({
      message: "Something went wrong, please fill all the fields",
    });
  }

  const data = await userModel.create({ username, password });

  res.status(201).json({
    message: "done",
    data,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
