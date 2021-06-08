const express = require("express");
const router = express.Router();
const pool = require("./../../db");

router.get("/", (req, res) => {
  const company_id = req.query.company_id;
  const status = req.query?.status?.toLowerCase();

  let whereStr = '';
  if (status === "completed") {
    whereStr = ` AND job.is_done = 1`;
  } else if (status) {
    whereStr = ` AND proposal.status = '${status}'`;
  }

  const selectProposals = `SELECT 
    user.name AS user_name,
    proposal.id AS proposal_id,
    proposal.status AS proposal_status,
    job.id AS job_id,
    job.is_emergency AS job_is_emergency,
    job.is_done AS job_is_done,
    boat.city AS boat_location,
    boat_type.name AS boat_type,
    service.name AS service_name,
    company.id AS company_id,
    company.name AS company_name
FROM
    proposal
        LEFT JOIN
    job ON proposal.job_id = job.id
        LEFT JOIN
    user ON job.user_id = user.id
        LEFT JOIN
    boat ON job.boat_id = boat.id
        LEFT JOIN
    boat_type ON boat.boat_type_id = boat_type.id
        LEFT JOIN
    service ON job.service_id = service.id
        LEFT JOIN
    company ON proposal.company_id = company.id
    WHERE company.id = ${company_id}
    ` + whereStr + ';';

  pool.query(selectProposals, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(rows);
    }

  });
});

module.exports = router;