import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { useParams } from "react-router-dom";
import AddItem from "./addItem";
import { connect } from "react-redux";
import {
  fetchMenu,
  deleteMenu,
  clearMenu,
} from "../../redux/actions/adminActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    minWidth: 320,
    maxHeight: 50,
  },
  header: {
    padding: 14,
  },
  content: {
    padding: 0,
  },
  button: {
    marginTop: theme.spacing(6),
    width: 80,
  },
  icon: {
    lineHeight: 1,
    marginRight: 5,
  },
  addIcon: {
    lineHeight: 1,
    padding: 0,
  },
  container: {
    textAlign: "left",
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      padding: 0,
    },

  },
}));

function Menu(props) {
  const params = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = (ev) => {
    props.deleteItem(ev.currentTarget.id);
  };
  useEffect(() => {
    props.clearMenu();
    props.fetchMenu(params.id);
  }, [params.id,props.added]);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h2">
        {params.id}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
      >
        <Icon className={classes.icon}>
          <AddIcon className={classes.addIcon} />
        </Icon>
        <Typography>Add</Typography>
      </Button>
      <Card className={classes.root}>
        <CardContent className={classes.header}>
          <Grid container spacing={0} justify="space-evenly">
            <Grid item style={{ minWidth: 100 }}>
              <Typography variant="inherit" component="h4">
                Name
              </Typography>
            </Grid>
            <Grid item style={{ minWidth: 50 }}>
              <Typography variant="inherit" component="h4">
                Price(Rs.)
              </Typography>
            </Grid>
            <Grid item style={{ minWidth: 40 }}>
              <Typography variant="inherit" component="h4">
                Remove
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {props.menu.map((item) => {
        return (
          <Card key={item._id} className={classes.root}>
            <CardContent className={classes.content}>
              <Grid
                container
                spacing={0}
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item style={{ minWidth: 100 }}>
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid item style={{ minWidth: 50 }}>
                  <Typography>{item.price}</Typography>
                </Grid>
                <Grid item style={{ minWidth: 55 }}>
                  <Typography>
                    <IconButton
                      id={item._id}
                      onClick={deleteItem}
                      color="secondary"
                    >
                      <Icon>
                        <DeleteForeverTwoToneIcon className={classes.addIcon} />
                      </Icon>
                    </IconButton>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
      <AddItem op={open} hClose={handleClose} type={params.id} />
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenu: (type) => dispatch(fetchMenu(type)),
    deleteItem: (id) => dispatch(deleteMenu(id)),
    clearMenu: () => dispatch(clearMenu()),
  };
};

const mapStateToProps = (state) => {
  return {
    menu: state.fetch.menu,
    added: state.fetch.added,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
