import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProposalList from "./ProposalList";
import Divider from "@material-ui/core/Divider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    // width: 600,
  },
}));

export default function FullWidthTabs({currentUser, selection}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const tabs = [
    { label: "Pending", status: "pending" },
    { label: "Accepted", status: "accepted" },
    { label: "Completed", status: "completed" },
    { label: "Declined", status: "rejected" },
    { label: "Cancelled", status: "cancelled" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              label={tab.label}
              {...a11yProps(index)}
              style={{ borderRight: "0.1em solid #D8D8D8", padding: "0.5em" }}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((tab, index) => (
          <TabPanel value={value} index={index} dir={theme.direction}>
            <ProposalList status={tab.status} currentUser={currentUser} selection={selection}/>
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}
