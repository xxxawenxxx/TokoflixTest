import React, { Component } from "react";
import helper from "../help/helper";
import CurrencyFormat from "react-currency-format";
import Slider from "react-slick";
import user from "../userdata/user";
import { NavLink } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import "../css/additionalDetailStyle.css";
import 'react-confirm-alert/src/react-confirm-alert.css'

class DetailMovie extends Component {
  id = "";
  price = "";

  submit = () => {
    confirmAlert({
      title: 'Please Confirm',
      message: 'Are you sure to buy this movie ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.buyMovie()
        },
        {
          label: 'No',
          onClick: () => alert('Transaction Canceled')
        }
      ]
    })
  };


  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      genres: [],
      productionComp: [],
      productionCountry: [],
      spokenLang: [],
      crew: [],
      similarMovies: [],
      reccomendation:[],
      reload: 0
    };

    this.setReload = this.setReload.bind(this);
  }
  componentDidMount() {
    this.reDraw();
  }

  reDraw() {
    this.id = this.props.match.params.id.toString();
    this.fetchMovieData();
  }

  buyMovie() {
    let stat = user.buyingMovie(this.id, this.price);

    alert(stat);

    this.setState(
      {
        reload: this.state.reload + 1
      },
      () => {
        this.setReload();
      }
    );
  }

  setReload() {
    this.props.callback("reload");
  }

  fetchMovieData() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.id +
        "?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US"
    )
      .then(result => result.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          genres: json.genres,
          productionComp: json.production_companies,
          productionCountry: json.production_countries,
          spokenLang: json.spoken_languages
        });

        this.fetchCrew();
        this.fetchSimilarMovies(this.state.items.id);
        this.fetchReccomendation(this.state.items.id);
      });
  }

  fetchCrew() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.id +
        "/credits?api_key=0d7fb7ecd25ddcc4c6b5410edec63559"
    )
      .then(result => result.json())
      .then(json => {
        this.setState({
          crew: json.cast
        });
      });
  }

  fetchSimilarMovies(id) {
    fetch(
     'https://api.themoviedb.org/3/movie/'+id+'/similar?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US&page=1'
    )
      .then(result => result.json())
      .then(json => {
        this.setState({
          similarMovies: json.results
        });
      });
  }

  fetchReccomendation(id) {
    fetch(
     'https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=0d7fb7ecd25ddcc4c6b5410edec63559&language=en-US&page=1'
    )
      .then(result => result.json())
      .then(json => {
        this.setState({
          reccomendation: json.results
        });
      });
  }

  forceUpdate() {
    this.setState(
      {
        reload: this.state.reload + 1
      },
      () => {
        this.reDraw();
      }
    );
  }

  render() {
    let {
      items,
      genres,
      productionComp,
      productionCountry,
      spokenLang,
      crew,
      isLoaded,
      similarMovies,
      reccomendation
    } = this.state;
    this.price = helper.checkPrice(items.vote_average);
    let imageLink = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
    let backGroundImage ="http://image.tmdb.org/t/p/w1280/";

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true
    };

    if (!isLoaded) {
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
          <div className="backgroundImage">
                <img 
                  class= "card-img-top mt-10"
                  src={backGroundImage + items.backdrop_path}
                  alt="backdrop image"
                />
          </div>
          <div className="card w-75 mx-auto mt-5 px-3 border">
            <div className="card-top mt-3">
              <div className="media mt-0">
                <img
                  className="mr-5"
                  src={imageLink + items.poster_path}
                  alt="placeholder image"
                />
                <div className="media-body">
                  <h1 className="display-1">{items.original_title}</h1>
                  <h3>
                    {productionComp.map((item, index) =>
                      index < productionComp.length - 1
                        ? item.name + ", "
                        : item.name + ""
                    )}{" "}
                    |{" "}
                    {productionCountry.map((item, index) =>
                      index < productionCountry.length - 1
                        ? item.name + ", "
                        : item.name + ""
                    )}
                  </h3>
                  <h3>
                    {genres.map((item, index) =>
                      index < genres.length - 1
                        ? item.name + ", "
                        : item.name + ""
                    )}
                  </h3>
                  {items.overview}
                </div>
              </div>
            </div>
            <div className="card-body mt-3">
              <div className="row">
                <div className="col" align="center">
                  <span className="fa fa-2x fa-users" />
                  <h2>{items.popularity}</h2>
                </div>
                <div className="col" align="center">
                  <span className="fa fa-2x fa-hourglass-end" />
                  <h2>{items.runtime} Minutes</h2>
                </div>
                <div className="col" align="center">
                  <span className="fa fa-2x fa-language" />
                  <h2>
                    {spokenLang.map((item, index) =>
                      index < spokenLang.length - 1
                        ? item.name + ", "
                        : item.name + ""
                    )}
                  </h2>
                </div>
                <div className="col" align="center">
                  <span className="fa fa-2x fa-ticket" />
                  <h2>{items.status}</h2>
                </div>
                <div className="col" align="center">
                  <h2 className='text-warning'>
                    <CurrencyFormat
                      value={helper.checkPrice(items.vote_average)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp."}
                    />
                  </h2>
                </div>
                <div className="col" align="center">
                  <div
                    hidden={user.checkItem(this.id) === "own" ? true : false}
                  >
                    <span
                      className="fa fa-2x fa-times"
                      style={{ color: "red" }}
                    />
                    <h1>
                      <button
                        className="btn btn-danger"
                        onClick={this.submit}
                      >
                        Click here to buy
                      </button>
                    </h1>
                  </div>
                  <div
                    hidden={user.checkItem(this.id) === "own" ? false : true}
                  >
                    <span
                      className="fa fa-2x fa-check"
                      style={{ color: "green" }}
                    />
                    <h1>
                      <button className="btn btn-success" disabled={true}>
                        You own this movie
                      </button>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card w-75 mx-auto mt-3 px-3 border pb-3">
            <h1>Casts</h1>
            <Slider {...settings}>
              {crew.map((item, index) => (
                <div key={item.id}>
                  <div className="card">
                    <img
                      className="card-img-left"
                      src={
                        item.profile_path != null
                          ? imageLink + item.profile_path
                          : "https://jupiterascendingmovienews.com/wp-content/themes/PsyPlay/assets/css/img/noimg.png"
                      }
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="card w-75 mx-auto mt-3 px-3 border pb-3">
            <h1>Similar Movies</h1>
            <Slider {...settings}>
              {similarMovies.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="card mx-0" style={this.imgStyle}>
                    <img
                      className="card-img-left"
                      src={imageLink + item.poster_path}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <NavLink
                        onClick={this.forceUpdate.bind(this)}
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
            </Slider>
          </div>
        
          <div className="card w-75 mx-auto mt-3 px-3 border pb-3">
            <h1>Recommendation</h1>
            <Slider {...settings}>
              {reccomendation.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="card mx-0" style={this.imgStyle}>
                    <img
                      className="card-img-left"
                      src={imageLink + item.poster_path}
                      alt="Card cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <NavLink
                        onClick={this.forceUpdate.bind(this)}
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
            </Slider>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default DetailMovie;