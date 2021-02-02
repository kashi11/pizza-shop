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
  const history = useHistory();
  useEffect(() => {
    if (count === 0) {
      props.fetchMenu();
    }
    count = count + 1;
    priceChange();
  }, [flavour.price, crust.price, size.price, topping.price]);
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
      console.log("1");
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
            <Button color="secondary" variant="contained" onClick={handleOrder}>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
