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
import SignOff from "./SignOff";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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
  title: {
    flexGrow: 1,
  },
  userName: {
    padding: theme.spacing(2),
  },
  panaleName: {
    marginBottom: theme.spacing(3),
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&:selected": {
          backgroundColor: "#8bb4f7",
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


export default function NavBar({ currentUser, setCurrentUser }) {
  const classes = useStyles();
  const [selection, setSelection] = useState();
  const [showTab, setShowTab] = useState(true);
  const [panelTitle, setPanelTitle] = useState("Proposals");

  const handelListClick = (e, text) => {
    if (text == "Proposals") {
      setShowTab(true);
    } else {
      setShowTab(false);
    }
    setPanelTitle(text);
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
          <Typography variant="h6" noWrap className={classes.title}>
            NJORD
          </Typography>
          <Typography variant="h6" className={classes.userName}>{currentUser.user_name}</Typography>
          <SignOff setCurrentUser={setCurrentUser} />
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
        <Typography variant="h4" className={classes.panaleName}>{panelTitle}</Typography>
        {showTab && (
          <FilterBar currentUser={currentUser} setSelection={setSelection} />
        )}
        {showTab && <Tabs currentUser={currentUser} selection={selection} />}
        {!showTab && <ComingSoon />}
      </main>
    </div>
  );
}
