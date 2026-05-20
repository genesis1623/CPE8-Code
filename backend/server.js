const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("ERDMS API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});