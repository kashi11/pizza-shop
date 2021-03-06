import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Input,
  InputAdornment,
  Button,
  AppBar,
  Toolbar,
  FormHelperText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchMenu, makeOrder } from "../../redux/actions/custActions";
import MenuTable from "./menuTable";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  input: {
    width: 70,
  },
  name: {
    textAlign: "left",
    [theme.breakpoints.up("md")]: {
      width: "70%",

      marginBottom: theme.spacing(1),
    },
    width: "100%",
  },
  typography: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
    },
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textAlign: "left",
  },
  tHead: {
    fontWeight: 700,
  },
}));
var count = 0;
function CustomerPage(props) {
  const classes = useStyles();
  const [flavour, setFlavour] = useState({ value: "", name: "", price: 0 });
  const [crust, setCrust] = useState({ value: "", name: "", price: 0 });
  const [size, setSize] = useState({ value: "", name: "", price: 0 });
  const [topping, setTopping] = useState({ value: "", name: "", price: 0 });
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("null");
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const [errorOpen, setErrorOpen] = useState(false);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    if (count === 0) {
      props.fetchMenu();
    }
    count = count + 1;
    priceChange();
  }, [flavour.price, crust.price, size.price, topping.price, props.orderMade]);
  const flavours = props.menu.filter((item) => item.type === "Flavours");
  const crusts = props.menu.filter((item) => item.type === "Crusts");
  const sizes = props.menu.filter((item) => item.type === "Sizes");
  const toppings = props.menu.filter((item) => item.type === "Extra Toppings");
  const handleChange = (ev) => {
    if (ev.target.name === "flavour") {
      setFlavour((prevState) => {
        return { ...prevState, value: ev.target.value };
      });
    } else if (ev.target.name === "crust") {
      setCrust((prevState) => {
        return { ...prevState, value: ev.target.value };
      });
    } else if (ev.target.name === "size") {
      setSize((prevState) => {
        return { ...prevState, value: ev.target.value };
      });
    } else if (ev.target.name === "topping") {
      setTopping((prevState) => {
        return { ...prevState, value: ev.target.value };
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleDialogButton = () => {
    setDisable(false);
    setFlavour({value: "",price: 0, name: ""});
    setCrust({value: "",price: 0, name: ""});
    setSize({value: "",price: 0, name: ""});
    setTopping({value: "",price: 0, name: ""});
    setPrice(0);
    handleClose();
    props.fetchMenu();
  }
  const menuChange = (ev, index, type) => {
    if (type === "flavour") {
      setFlavour((prevState) => {
        return {
          ...prevState,
          price: flavours[index].price,
          name: flavours[index].name,
        };
      });
    } else if (type === "crust") {
      setCrust((prevState) => {
        return {
          ...prevState,
          price: crusts[index].price,
          name: crusts[index].name,
        };
      });
    } else if (type === "size") {
      setSize((prevState) => {
        return {
          ...prevState,
          price: sizes[index].price,
          name: sizes[index].name,
        };
      });
    } else if (type === "topping") {
      setTopping((prevState) => {
        return {
          ...prevState,
          price: toppings[index].price,
          name: toppings[index].name,
        };
      });
    }
  };

  const none = (type) => {
    if (type === "crust") {
      setCrust((prevState) => {
        return { ...prevState, price: "0", name: "" };
      });
    } else if (type === "topping") {
      setTopping((prevState) => {
        return { ...prevState, price: "0", name: "" };
      });
    }
  };
  const priceChange = () => {
    const p =
      parseInt(flavour.price) +
      parseInt(crust.price) +
      parseInt(size.price) +
      parseInt(topping.price);
    setPrice(p);
  };

  const handleOrder = () => {
    setDisable(true);
    if (
      flavour.name !== "" &&
      size.name !== "" &&
      name !== "null" &&
      name !== ""
    ) {
      const order = {
        name: name,
        flavour: flavour.name,
        crust: crust.name,
        topping: topping.name,
        size: size.name,
        price: price,
      };
      props.makeOrder(order);
    } else {
      setErrorOpen(true);
      setDisable(false);
    }
  };
  const nameChange = (ev) => {
    setName(ev.target.value);
  };
  const home = () => {
    history.push("/");
  };
  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography>Pizza Shop</Typography>
          </Box>
          <Button onClick={home} variant="outlined">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Typography className={classes.typography} variant="h4" component="h4">
        Order Your Favourite Pizza Now
      </Typography>
      <div>
        <Grid
          className={classes.name}
          container
          spacing={2}
          justify="flex-start"
        >
          <Grid item xs={12}>
            <FormControl
              className={classes.name}
              required
              error={name === "" ? true : false}
            >
              <InputLabel>Customer's Name</InputLabel>
              <Input
                required
                onChange={nameChange}
                className={classes.name}
                error={name === "" ? true : false}
              />
              <FormHelperText error={name === "" ? true : false}>
                {name === "" ? "Please enter name" : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center" alignContent="center">
          <Grid item xs={12} sm={4} lg={3}>
            <FormControl className={classes.formControl} required>
              <InputLabel>Flavour</InputLabel>
              <Select
                name="flavour"
                value={flavour.value}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  Flavours
                </MenuItem>
                {flavours.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={(ev) => menuChange(ev, index, "flavour")}
                      value={index}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>Crust</InputLabel>
              <Select name="crust" value={crust.value} onChange={handleChange}>
                <MenuItem value="" disabled>
                  Crusts
                </MenuItem>
                <MenuItem value={0} onClick={(ev) => none("crust")}>
                  None
                </MenuItem>
                {crusts.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={(ev) => menuChange(ev, index, "crust")}
                      value={1 + index}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>Extra Topping</InputLabel>
              <Select
                name="topping"
                value={topping.value}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  Extra Toppings
                </MenuItem>
                <MenuItem value={0} onClick={(ev) => none("topping")}>
                  None
                </MenuItem>
                {toppings.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={(ev) => menuChange(ev, index, "topping")}
                      value={1 + index}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl required className={classes.input}>
              <InputLabel>Size</InputLabel>
              <Select name="size" value={size.value} onChange={handleChange}>
                <MenuItem value="" disabled>
                  Sizes
                </MenuItem>
                {sizes.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={(ev) => menuChange(ev, index, "size")}
                      value={index}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                readOnly
                id="standard-adornment-amount"
                value={price}
                startAdornment={
                  <InputAdornment position="start">Rs.</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={disable}
              color="secondary"
              variant="contained"
              onClick={handleOrder}
            >
              Order
            </Button>
          </Grid>
        </Grid>
        <MenuTable
          flavour={flavours}
          crust={crusts}
          size={sizes}
          topping={toppings}
        />
      </div>
      <Dialog
        fullWidth
        open={errorOpen}
        onClose={handleErrorClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Error! Something Went Wrong
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>1. Check your internet connection</ListItem>
            <ListItem>2. Check all required items are entered</ListItem>
          </List>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleErrorClose}
            >
              Ok
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={props.orderMade}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Order Placed</DialogTitle>
        <DialogContent>
          Your order has been placed successfully. <br />
          Thank you!
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDialogButton}
            >
              Ok
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenu: () => dispatch(fetchMenu()),
    makeOrder: (order) => dispatch(makeOrder(order)),
  };
};

const mapStateToProps = (state) => {
  return {
    menu: state.fetch.menu,
    orderMade: state.fetch.orderMade,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
