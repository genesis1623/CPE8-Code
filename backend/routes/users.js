const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();


// CREATE USER 
router.post("/", verifyToken, verifyAdmin, async (req, res) => {

  console.log("BODY:", req.body); // 👈 ADD THIS

  const { fullname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users(fullname, email, password, role, status)
      VALUES (?, ?, ?, ?, 'Active')
    `;

    db.query(sql,
      [fullname, email, hashedPassword, role],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "User created successfully" });
      }
    );

  } catch (error) {
    res.status(500).json(error);
  }
});


// READ USERS
router.get("/", verifyToken, verifyAdmin, (req, res) => {

  const sql = `
    SELECT id, fullname, email, role, status
    FROM users
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });

});


// UPDATE USER 
router.put("/:id", verifyToken, verifyAdmin, (req, res) => {

  const { fullname, email, role } = req.body;

  const sql = `
    UPDATE users
    SET fullname=?, email=?, role=?
    WHERE id=?
  `;

  db.query(sql,
    [fullname, email, role, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User updated successfully" });
    }
  );
});


// DEACTIVATE USER 
router.patch("/deactivate/:id", verifyToken, verifyAdmin, (req, res) => {
  const sql = `
    UPDATE users
    SET status='Inactive'
    WHERE id=?
  `;

  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "User deactivated" });
  });
});


// ACTIVATE USER 
router.patch("/activate/:id", verifyToken, verifyAdmin, (req, res) => {

  const sql = `
    UPDATE users
    SET status='Active'
    WHERE id=?
  `;

  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "User activated" });
  });

});

module.exports = router;