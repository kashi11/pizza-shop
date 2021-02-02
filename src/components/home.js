import React from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import background from "./pizza.png"
const useStyles = makeStyles((theme)=>({
  root: {
    width: 100,
  },
  gridContent: {
    height: "60vh"
  },
  container: {
    padding: 0,
    marginTop: "-1.4em",
    height: "92vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`,
  },
  header: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    width: "100%",
    background: "#3730308a",
    color: "white",
    
  }
}));


function Home() {
  const classes = useStyles();
  const history = useHistory();

  const customer = () => {
    history.push("/customer");
  }
  const admin = () => {
    history.push("/admin/orders/all");
  }
  const employee = () => {
    history.push("/employee")
  }
  const StyledButton = (props) => {
    return (
      <Button onClick={props.onClick} className={classes.root} color="secondary" variant="contained">
        {props.name}
      </Button>
    );
  };
  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar>Pizza Shop</Toolbar>
      </AppBar>
      <Container className={classes.container} >
        <div className={classes.header}>
        <Typography variant="h4" component="h1">
          Welcome to Pizza Shop
        </Typography>
        </div>
        <Grid className={classes.gridContent} container spacing={1} justify="center" alignContent="flex-end">
          <Grid item xs={12} sm={2} lg={2}>
            <StyledButton onClick={customer} name="customer" />
          </Grid>
          <Grid item xs={12} sm={2} lg={1}>
            <StyledButton onClick={employee} name="employee" />
          </Grid>
          <Grid item xs={12} sm={2} lg={2}>
            <StyledButton onClick={admin} name="Admin" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
