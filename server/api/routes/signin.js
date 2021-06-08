const express = require("express");
const router = express.Router();
const pool = require("./../../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const selectUserRoleID = `SELECT id FROM user_role WHERE role = '${req.body.user_role}';`;
  pool.query(selectUserRoleID, (err, rows, fields) => {
    const companyUserRoleID = rows?.[0]?.id;
    const selectUser = `SELECT 
      user.id AS user_id, 
      company.id AS company_id, 
      user.password 
FROM 
  user 
LEFT JOIN company 
ON user.id = company.user_id 
WHERE user.name = '${req.body.name}' AND user_role_id = ${companyUserRoleID};`;

    pool.query(selectUser, async (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else if (rows.length > 0) {
        is_auth = await bcrypt.compare(req.body.password, rows?.[0]?.password);
        res
          .status(201)
          .send(
            `{"user_id": "${rows?.[0]?.user_id}", "company_id": "${rows?.[0]?.company_id}", "is_auth": "${is_auth}"}`
          );
      } else {
        res.status(400).header({'conten_type': 'application/json'}).send("Cannot find user");
      }
    });
  });
});

module.exports = router;
