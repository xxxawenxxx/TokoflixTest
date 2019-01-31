import React, { Component } from 'react'
import moment from 'moment';
import './Home.css';
import helper from "../help/helper";
import CurrencyFormat from "react-currency-format";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  date = moment().format("YYYY-MM-DD");
  dateprev = moment()
    .subtract(1, "month")
    .format("YYYY-MM-DD");
  id = "";
  linkToFetch = "";

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 0,
      loading: false,
      prevY: 0
    };
    }

  componentDidMount() {
    this.fetchData(this.state.page);
  }

  
  fetchData(page) {
    this.setState({ loading : true});
    axios
        .get("https://api.themoviedb.org/3/movie/now_playing?api_key=0112ab56c190449c8c76b9893832e703&language=en-US&region=US%7CID&page=" +
        this.state.page)
        .then(result => result.json())
        .then(json => {
        this.setState({
          loading: false,
          items: json
        });
      });
  }

  

  render() {
    let {loading, items,page} = this.state;
    let imageLink = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

    if (!loading) {
      return (
        <React.Fragment>
          <div className="d-flex justify-content-center">
            <i className="fa fa-spinner fa-spin fa-5x" />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="container mt-5">
            <div className="row justify-content-md-left">
              <div className="col-8">
                <div className="row d-flex justify-content-center">
                  {this.stateitems.results.map(item => (
                    <React.Fragment key={item.id}>
                      <div className="card  mx-0" style={this.imgStyle}>
                        <img
                          className="card-img-left"
                          src={imageLink + item.poster_path}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <h6 className="card-title" style={this.priceStyle}>
                            <CurrencyFormat
                              value={helper.checkPrice(item.vote_average)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp."}
                            />
                          </h6>
                          <NavLink
                            className="btn btn-primary"
                            exact
                            to={item.id + "-" + helper.replaceSpace(item.title)}
                          >
                            DETAIL
                          </NavLink>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  imgStyle = {
    width: "18rem"
  };

  textStyle = {
    height: "18rem"
  };

  priceStyle = {
    color: "green"
  };
}


export default withRouter(Home);