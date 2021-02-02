import "./App.css";
import Container from "@material-ui/core/Container";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";
import CustomerPage from "./components/customer/customer";
import Admin from "./components/admin/admin";
import Employee from "./components/employee";

function App() {
  return (
    <Container>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/customer" component={CustomerPage} />
          <Route path="/admin" component={Admin} />
          <Route path="/employee" component={Employee} />
        </Switch>
      </div>
    </Container>
  );
}

export default App;
