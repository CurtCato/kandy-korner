import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";

import EmployeeList from "./employee/EmployeeList";
import EmployeeDetail from "./employee/EmployeeDetail";
import StoreList from "./store/StoreList";
import StoreDetail from "./store/StoreDetail";
import CandyList from "./candy/CandyList";
import CandyDetail from "./candy/CandyDetail";
import ApiManager from "./modules/ApiManager";
import Login from "./authentication/Login"

class ApplicationViews extends Component {
  state = {
    stores: [],
    employees: [],
    candyTypes: [],
    candies: []
  };

  componentDidMount() {
    const newState = {};

    ApiManager.getAll("stores")
      .then(stores => (newState.stores = stores))
      .then(() => ApiManager.getAll("employees"))
      .then(employees => (newState.employees = employees))
      .then(() => ApiManager.getAll("candyTypes"))
      .then(candyType => (newState.candyTypes = candyType))
      .then(() => ApiManager.getAll("candies"))
      .then(candies => (newState.candies = candies))
      .then(() => {
        console.log(newState);
      })
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null

  deleteCandy = id => {
    return fetch(`http://localhost:5002/candies/${id}`, {
      method: "DELETE"
    })
      .then(() => ApiManager.getAll("candies"))
      .then(candies => {
        this.props.history.push("/candy");
        this.setState({ candies: candies });
      });
  };
  deleteStore = id => {
    return fetch(`http://localhost:5002/stores/${id}`, {
      method: "DELETE"
    })
      .then(() => ApiManager.getAll("stores"))
      .then(stores => {
        this.props.history.push("/");
        this.setState({ stores: stores });
      });
  };
  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(() => ApiManager.getAll("employees"))
      .then(employees => {
        this.props.history.push("/employee");
        this.setState({ employees: employees });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
            return <StoreList stores={this.state.stores} />;
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/stores/:storeId(\d+)"
          render={props => {
            let store = this.state.stores.find(
              store => store.id === parseInt(props.match.params.storeId)
            );
            if (!store) {
              store = { id: 404, name: "404", place: "Store not found" };
            }
            return <StoreDetail store={store} deleteStore={this.deleteStore} />;
          }}
        />
        <Route
          path="/employee"
          render={props => {
            if (this.isAuthenticated()) {
            let store = this.state.stores.find(
              store => store.id === parseInt(props.match.params.storeId)
            );
            if (!store) {
              store = { id: 404, name: "404", person: "Employee not found" };
            }
            return <EmployeeList employees={this.state.employees} />;
          } else {
            return <Redirect to="/login" />
          }
          }}
        />
        <Route
          path="/employees/:employeeId(\d+)"
          render={props => {
            let employee = this.state.employees.find(
              employee => employee.id === parseInt(props.match.params.employeeId)
            );
            if (!employee) {
              employee = { id: 404, name: "404", person: "Employee not found" };
            }
            return <EmployeeDetail employee={employee} deleteEmployee={this.deleteEmployee} />;
          }}
        />
        <Route
          exact
          path="/candy"
          render={props => {
            if (this.isAuthenticated()) {
            return (
              <CandyList
                candies={this.state.candies}
                deleteCandy={this.deleteCandy}
                candyTypes={this.state.candyTypes}
              />
            )} else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/candy/:candyId(\d+)"
          render={props => {
            let candy = this.state.candies.find(
              candy => candy.id === parseInt(props.match.params.candyId)
            );
            if (!candy) {
              candy = { id: 404, name: "404", candy: "Candy not found" };
            }
            return <CandyDetail candy={candy} deleteCandy={this.deleteCandy} />;
          }}
        />
        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
