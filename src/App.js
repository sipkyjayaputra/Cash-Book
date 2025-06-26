import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
// import Layout from "./container/Layout";
import Home from "./views/Home";
import History from "./views/History";
import HighestDebit from "./views/HighestDebit";
import HighestCredit from "./views/HighestCredit";
import AverageCredit from "./views/AverageCredit";
import AverageDebit from "./views/AverageDebit";
import Information from "./views/Information";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Register from "./views/Register";
import Debit from "./views/Debit";
import Credit from "./views/Credit";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/credit" component={Credit} />
            <PrivateRoute path="/debit" component={Debit} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/information" component={Information} />
            <PrivateRoute path="/average-debit" component={AverageDebit} />
            <PrivateRoute path="/average-credit" component={AverageCredit} />
            <PrivateRoute path="/highest-credit" component={HighestCredit} />
            <PrivateRoute path="/highest-debit" component={HighestDebit} />
            <PrivateRoute path="/history" component={History} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
