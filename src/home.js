import { React, Component } from "react";
import axios from "axios";
import moment from "moment";
import Header from './header.js'

class Home extends Component {
  state = {
    weather: [],
    temp: [],
    city: "",
    country: "",
    wind: "",
    more: false,
    isLoading: false,
    error: "",
  };

  componentDidMount = () => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: "Boston, US",
          units: "imperial",
          appid: "72ed2eef9a80c207a8ff8fbb8d721c64",
        },
      })
      .then((response) => {
        const data = response.data;
        this.setState({
          weather: data.weather,
          wind: data.wind,
          temp: data.main,
          city: data.name,
          country: data.sys.country,
          isLoading: true,
        });
      })
      .catch((error) => this.setState({ error: error }));
  };
  render() {
    const { weather, city, wind, country, isLoading, more } = this.state;
    var today = this.state.temp;
    var temp = Math.floor(today.temp);
    var feel = Math.floor(today.feels_like);
    var high = Math.floor(today.temp_max);
    var low = Math.floor(today.temp_min);
    var humidity = Math.floor(today.humidity);
    var date = moment().format("dddd, MMMM Do YYYY h:mm A");
    return (
      <div className="container" style={{ marginLeft: "0.5%" }}>
        <p>{date}</p>
        <h1>Daily News.com</h1>
        {isLoading ? (
          <div className="row">
            <div className="col col-lg-4" />
            <div className="col col-lg-4" />
            <div
              className="col col-lg-4"
              style={{ marginTop: "-8%", marginLeft: "90%" }}
            >
              <span>
                <h4>
                  {city}, {country}
                </h4>
                <img
                  width="50px"
                  height="50px"
                  src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                  alt=""
                />
                <b>{temp}°F</b>
              </span>
              &nbsp;
              {!more ? (
                <button onClick={() => this.setState({ more: true })}>
                  <span className="glyphicon glyphicon-arrow-down"></span>
                </button>
              ) : null}
              <br />
              {more ? (
                <span>
                  <b>
                    Feels like {feel}°F, {weather[0].description}
                  </b>{" "}
                  <br />{" "}
                  <span className="glyphicon glyphicon-arrow-up text-primary"></span>{" "}
                  High: {high}°F, &nbsp;&nbsp;
                  <span className="glyphicon glyphicon-arrow-down text-primary"></span>{" "}
                  Low: {low}°F <br />
                  <span className="glyphicon glyphicon-tint text-primary" />{" "}
                  Humidity: {humidity}% &nbsp;&nbsp;
                  <span className="glyphicon glyphicon-send text-primary"></span>{" "}
                  Wind: {wind.gust} mph
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <Header />
      </div>
    );
  }
}

export default Home;
