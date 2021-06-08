const express = require("express");
const router = express.Router();
const pool = require("./../../db");

router.put("/", async (req, res) => {

  const cancelStatus = `
UPDATE proposal
SET status = "cancelled"
WHERE id = ${req.body?.proposal_id};
`;

pool.query(cancelStatus, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
