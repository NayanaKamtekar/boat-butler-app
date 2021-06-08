const express = require("express");
const router = express.Router();
const pool = require("./../../db");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  try {
    const selectUserRoleID =
      `SELECT id FROM user_role WHERE role = '${req.body.user_role}';`;
    pool.query(selectUserRoleID, async (err, rows, fields) => {
      const companyUserRoleID = rows?.[0]?.id;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const insertUser = `INSERT INTO user (name, password, user_role_id) VALUES ('${req.body.name}', '${hashedPassword}', ${companyUserRoleID});`;
      pool.query(insertUser, (err, rows, fields) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(rows);
        }
      });
    });
  } catch {
      res.status(500).send()
  }
});

module.exports = router;
