import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter } from "react-router-dom";
import homeInfinite from "./components/homeInfinite";
import Home from "./components/Home";
import DetailMovie from "./components/detailMovie";

class App extends Component {
  constructor() {
    super();
    this.state = {
      reload: 0
    };
  }

  setReload(test) {
    this.setState(
      {
        reload: test
      },
      () => {
        this.forceUpdate();
      }
    );
    console.log(this.state.reload);
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <NavBar reload={this.state.reload} />
            <main className="justify-content-center">
            <Route exact path="/" component={Home} />
              <Route
                exact
                path="/?:search=:page"
                component={Home}
              />
              <Route
                exact
                path="/:id-:slug"
                render={props => (
                  <DetailMovie
                    {...props}
                    callback={this.setReload.bind(this)}
                  />
                )}
              />
              </main>
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
