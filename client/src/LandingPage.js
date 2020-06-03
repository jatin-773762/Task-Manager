import React, { Component } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./LandingPage.css";
import App from "./App";

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      redirectUrl: "/user",
    };
  }
  showError = (err) => {
    toast.configure();
    toast.error(err, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 5000,
    });
  };
  loginUser = (userid, name) => {
    $(".heading").css("display", "none");
    $(".footer").css("display", "none");
    this.setState({
      isLoggedIn: true,
      redirectUrl: "/user?user_id=" + userid + "&name=" + name,
    });
  };
  signOutUser = () => {
    window.location = "/";
    console.log("sign out clicked");

    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    return (
      <Router>
        <Route exact path="/">
          <Login showError={this.showError} loginUser={this.loginUser} />
        </Route>
        <Route path="/signup">
          <Register showError={this.showError} loginUser={this.loginUser} />
        </Route>
        <Route path="/user">
          <App showError={this.showError} signOutUser={this.signOutUser} />
        </Route>

        {this.state.isLoggedIn ? (
          <Redirect push to={this.state.redirectUrl}></Redirect>
        ) : (
          ""
        )}
        <div className="heading">
          <div className="title">
            <h1>Chores</h1>
            <p>Make,Track and complete your tasks !!</p>
          </div>

          <div className="thumbnail"></div>
        </div>
        <div className="footer"></div>
      </Router>
    );
  }
}
