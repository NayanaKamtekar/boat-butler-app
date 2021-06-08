import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "./Tabs";
import FilterBar from "./FilterBar";
import ComingSoon from "./ComingSoon";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // backgroundColor: "#2f2c63"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#313857",
    color: "#8bb4f7",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&:selected": {
          backgroundColor: "#8bb4f7",
          // "&:hover": {
          //   backgroundColor: "#8bb4f7",
          // },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "#8bb4f7",
          color: "#313857",
          fontWidth: "bold",
        },
      },
    },
  },
});
export default function ClippedDrawer({ currentUser }) {
  const classes = useStyles();
  const [selection, setSelection] = useState();
  const [showTab, setShowTab] = useState(true);

  const handelListClick = (e, text) => {
    if (text == "Proposals") {
      setShowTab(true);
    } else {
      setShowTab(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            NJORD
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.drawerContainer}>
              <List>
                {["Dashboard", "Job Ads", "Proposals", "Reviews"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{ variant: "h5" }}
                        onClick={(e) => handelListClick(e, text)}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </div>
          </ThemeProvider>
        </MuiThemeProvider>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {showTab && (
          <FilterBar currentUser={currentUser} setSelection={setSelection} />
        )}
        {showTab && <Tabs currentUser={currentUser} selection={selection} />}
        {!showTab && <ComingSoon />}
      </main>
    </div>
  );
}
