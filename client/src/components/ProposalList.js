import React, { useEffect, useState } from "react";
import axios from 'axios';
  
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  },
  table: {
    minWidth: 650,
  },
  head: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    color: "white",
  },
  callOffStyle: {
    border: "white",
    borderWidth: 10,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    marginLeft: "12%",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Proposal({ status, currentUser, selection }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const fetchdata = async () => {
    let resp = await (
      await fetch(
        `http://localhost:3001/api/company/proposals?company_id=${currentUser.company_id}&status=${status}`
      )
    ).json();

    for (let filterKey in selection) {
      if (selection[filterKey].length > 0) {
        resp = resp.filter((record) => {
          return selection[filterKey].includes(record[filterKey]);
        });
      }
    }

    setRows(resp);
  };

  useEffect(() => {
    fetchdata();
  }, [selection]);

  const handleCancel = (e, index) => {
    const proposalID = rows?.[index]?.proposal_id;
    console.log(proposalID)
    try {
      axios
        .put("http://localhost:3001/api/company/cancel", {
          proposal_id: proposalID,
        })
        .then(
          () => {
            fetchdata();
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <TableContainer component={Paper} style={{ padding: 0 }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>User Name</TableCell>
              <TableCell className={classes.head} align="left">
                Boat Type
              </TableCell>
              <TableCell className={classes.head} align="left">
                Service
              </TableCell>
              <TableCell className={classes.head} align="left">
                Boat Location
              </TableCell>
              <TableCell className={classes.head} align="left">
                Job Type
              </TableCell>
              <TableCell className={classes.head} align="left"></TableCell>
              <TableCell className={classes.head} align="left"></TableCell>
              <TableCell className={classes.head} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.user_name}
                </TableCell>
                <TableCell align="left">{row.boat_type}</TableCell>
                <TableCell align="left">{row.service_name}</TableCell>
                <TableCell align="left">{row.boat_location}</TableCell>
                <TableCell align="left">
                  {row.job_is_emergency ? "Emergency" : "Normal"}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    style={{ padding: 0 }}
                    // onClick={() => redirectToAllDocument(row)}
                  >
                    <MailIcon />
                  </IconButton>
                </TableCell>
                {status === "pending" && (
                  <TableCell align="left">
                    <Button
                      style={{ padding: 0 }}
                      variant="contained"
                      color="primary"
                      onClick={(e) => handleCancel(e, index)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                )}
                <TableCell align="left">
                  <IconButton style={{ padding: 0 }}>
                    <SearchIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
