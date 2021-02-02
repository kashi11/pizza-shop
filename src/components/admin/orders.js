import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { fetchOrders, clearOrders } from "../../redux/actions/adminActions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  colCell: {
    fontWeight: 700,
  },
  header: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: "left",
    textTransform: "capitalize",
  },
}));
const columns = [
  { field: "id", headerName: "No.", width: 90 },
  { field: "name", headerName: "Customer's Name", width: 190 },
  { field: "flavour", headerName: "Flavour", width: 130 },
  { field: "crust", headerName: "Crust", width: 130 },
  { field: "topping", headerName: "Extra Toppings", width: 180 },
  { field: "size", headerName: "Size", width: 110 },
  { field: "price", headerName: "Price (Rs.)", width: 150 },
];
function Orders(props) {
  const params = useParams();
  const classes = useStyles();
  useEffect(() => {
    props.clearOrders();
    props.fetchOrders(params.id);
  }, [params.id]);
  var rows = [];
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
  }
  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <Typography className={classes.header} component="h3" variant="h4">
        {params.id} Orders
      </Typography>
      <DataGrid
        className={{ colCellTitle: classes.colCell }}
        rows={rows}
        columns={columns}
        pagination
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (id) => {
      dispatch(fetchOrders(id));
    },
    clearOrders: () => dispatch(clearOrders()),
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.fetch.orders,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
