import React from "react";
import {
  Typography,
  Grid,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  tHead: {
    fontWeight: 700,
  },
  header: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    textAlign: "left",
  },
  container: {
    paddingBottom: theme.spacing(3),
  }
}));
function Menu(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h4" component="h3" className={classes.header}>
        Menu
      </Typography>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className={classes.tHead} component="h1">
                <TableRow>
                  <TableCell className={classes.tHead}>Flavours</TableCell>
                  <TableCell className={classes.tHead}>Price (Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.flavour.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className={classes.tHead} component="h1">
                <TableRow>
                  <TableCell className={classes.tHead}>Crusts</TableCell>
                  <TableCell className={classes.tHead}>Price (Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.crust.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className={classes.tHead} component="h1">
                <TableRow>
                  <TableCell className={classes.tHead}>Sizes</TableCell>
                  <TableCell className={classes.tHead}>Price (Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.size.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className={classes.tHead} component="h1">
                <TableRow>
                  <TableCell className={classes.tHead}>
                    Extra Toppings
                  </TableCell>
                  <TableCell className={classes.tHead}>Price (Rs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.topping.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Menu;
