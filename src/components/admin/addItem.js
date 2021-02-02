import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { addMenu, fetchMenu } from "../../redux/actions/adminActions";
function AddItem(props) {
  const [state, setState] = useState({ name: "null", price: "null" });
  const handleChange = (ev) => {
    setState((prevState) => {
      return { ...prevState, [ev.target.name]: ev.target.value };
    });
  };
  const add = () => {
    if (state.name === "null") {
      setState((prevState) => {
        return { ...prevState, name: "" };
      });
    }
    if (state.price === "null") {
      setState((prevState) => {
        return { ...prevState, price: "" };
      });
    }
    if (
      state.name === "" ||
      state.name === "null" ||
      state.price === "" ||
      state.price === "null"
    ) {
    } else {
      props.addMenu(props.type,state.name,state.price);
      props.hClose();
    }
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={props.op}
        onClose={props.hClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add {props.type} </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            color="secondary"
            name="name"
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            error={state.name ? false : true}
            helperText={state.name ? "" : "Name is required."}
            onChange={handleChange}
          />
          <TextField
            required
            color="secondary"
            margin="dense"
            name="price"
            id="price"
            label="Price (Rs.)"
            type="text"
            fullWidth
            error={state.price ? false : true}
            onChange={handleChange}
            helperText={state.price ? "" : "Price is required."}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={add} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    addMenu: (t,n,p)=>dispatch(addMenu(t,n,p)),
    fetchMenu: (type) => dispatch(fetchMenu(type)),
  }
}
export default connect(null,mapDispatchToProps)(AddItem);