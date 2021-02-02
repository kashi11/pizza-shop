import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { fetchOrders } from ".././redux/actions/adminActions";
import { completeOrder } from ".././redux/actions/empActions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  colCell: {
    fontWeight: 700,
  },
  header: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textAlign: "left",
  },
}));
var rows = [];
function Employee(props) {
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    props.fetchOrders("inprogress");
  }, [props.completed]);
  const columns = [
    { field: "id", headerName: "No.", width: 100 },
    { field: "name", headerName: "Customer's Name", width: 190 },
    { field: "flavour", headerName: "Flavour", width: 130 },
    { field: "crust", headerName: "Crust", width: 130 },
    { field: "topping", headerName: "Extra Toppings", width: 180 },
    { field: "size", headerName: "Size", width: 110 },
    { field: "price", headerName: "Price (Rs.)", width: 150 },
    {
      field: "complete",
      headerName: "Mark Completed",
      width: 200,
      renderCell: (params) => {
        const handleClick = () => {
          props.completeOrder(props.orders[params.rowIndex]._id);
        };
        return (
          <strong>
            <IconButton color="secondary" onClick={handleClick}>
              <CheckCircleIcon />
            </IconButton>
          </strong>
        );
      },
    },
  ];
  if (props.orders.length !== 0) {
    rows = props.orders.map((order, index) => {
      return {
        id: index + 1,
        name: order.name,
        flavour: order.flavour,
        crust: order.crust,
        topping: order.topping,
        size: order.size,
        price: order.price,
      };
    });
  } else {
    rows = [];
  }
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
          <Button variant="outlined" onClick={home}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" component="h3" className={classes.header}>
        Take Orders
      </Typography>
      <div style={{ height: "77vh", width: "100%" }}>
        <DataGrid
          className={{ colCellTitle: classes.colCell }}
          rows={rows}
          columns={columns}
          pagination
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (id) => {
      dispatch(fetchOrders(id));
    },
    completeOrder: (id) => dispatch(completeOrder(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.fetch.orders,
    completed: state.fetch.compl,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Employee);
