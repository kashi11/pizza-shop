import {
  Typography,
  Hidden,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  Container,
  ListItemText,
  Box,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Route, useHistory } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Orders from "./orders";
import Menu from "./menu";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#102027",
    color: "white",
  },
  drawerContent: {
    textAlign: "left",
  },
  nested: {
    marginTop: "-1em",
    paddingLeft: theme.spacing(5),
  },
  content: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));
function Admin() {
  const history = useHistory();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const orders = (ev) => {
    if(mobileOpen){
      handleDrawerToggle();
    }
    history.push("/admin/orders/" + ev.currentTarget.id);
  };
  const menu = (ev) => {
    if(mobileOpen){
      handleDrawerToggle();
    }
    history.push("/admin/menu/" + ev.currentTarget.id);
  };
  const home = () => {
    history.push("/");
  }
  const drawer = (
    <Container className={classes.drawerContent}>
      <div className={classes.toolbar} />
      <Typography variant="h6" component="h4">
        Pizza Shop
      </Typography>
      <Divider />
      <List component="div">
        <ListItem>
          <ListItemText primary="Orders" />
        </ListItem>
        <List component="div">
          <ListItem button id="all" onClick={orders} className={classes.nested}>
            <ListItemText primary="All" />
          </ListItem>
          <ListItem
            button
            id="completed"
            onClick={orders}
            className={classes.nested}
          >
            <ListItemText primary="Completed" />
          </ListItem>
          <ListItem
            button
            id="inprogress"
            onClick={orders}
            className={classes.nested}
          >
            <ListItemText primary="In Progress" />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText primary="Menu" />
        </ListItem>
        <List component="div">
          <ListItem
            button
            id="Flavours"
            onClick={menu}
            className={classes.nested}
          >
            <ListItemText primary="Flavours" />
          </ListItem>
          <ListItem button id="Sizes" onClick={menu} className={classes.nested}>
            <ListItemText primary="Sizes" />
          </ListItem>
          <ListItem
            button
            id="Crusts"
            onClick={menu}
            className={classes.nested}
          >
            <ListItemText primary="Crusts" />
          </ListItem>
          <ListItem
            button
            id="Extra Toppings"
            onClick={menu}
            className={classes.nested}
          >
            <ListItemText primary="Extra Toppings" />
          </ListItem>
        </List>
      </List>
    </Container>
  );
  return (
    <div>
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <Box display="flex" flexGrow={1}>
              <Typography>Pizza Shop</Typography>
            </Box>
          </Hidden>
          <Hidden smDown>
            <Box display="flex" flexGrow={1}></Box>
          </Hidden>
          <Button onClick={home} variant="outlined">Home</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Route path="/admin/orders/:id" exact component={Orders} />
        <Route path="/admin/menu/:id" component={Menu} />
      </main>
    </div>
  );
}

export default Admin;
