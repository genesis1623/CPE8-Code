const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { fullname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users(fullname, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [fullname, email, hashedPassword, role], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ message: "User Registered" });
    });

  } catch (err) {
    console.log("FULL ERROR:", err);

    return res.status(500).json({
      fatal: true,
      message: err.message
    });
  }
});


// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    // USER NOT FOUND
    if (result.length === 0) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const user = result[0];

    // CHECK PASSWORD
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Success",
      token,
      role: user.role
    });
  });
});

module.exports = router;