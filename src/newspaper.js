import { React, Component } from "react";
import axios from "axios";

class newspaper extends Component {
  state = {
    news: [],
    isLoading: false,
    error: "",
  };

  componentDidMount = () => {
    axios
      .get("https://newsapi.org/v2/top-headlines", {
        params: { country: "us", apiKey: "fe663596255749a58b75b2e4eb8d71c0" },
      })
      .then((response) => {
        const news = response.data.articles;
        this.setState({ news: news, isLoading: true });
      })
      .catch((error) => {
        this.setState({ error: error, isLoading: true });
      });
  };
  render() {
    const { isLoading, news } = this.state;
    return (
      <div className="conatiner">
        {isLoading ? (
          news.map((headlines, i) => {
            return (
              <div key={i}>
                {headlines.urlToImage !== null &&
                headlines.description !== null &&
                headlines.content !== null ? (
                  <div>
                    <span className="col-sm-9">
                      <h3>{headlines.title}</h3>
                      <p>
                        {headlines.author !== "" && headlines.author !== null
                          ? `By: ${headlines.author}`
                          : ""}{" "}
                      </p>
                    </span>
                    <div className="row">
                      <div className="col-sm-5">
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={
                            headlines.urlToImage !== null
                              ? headlines.urlToImage
                              : null
                          }
                          className="img-thumbnail"
                          alt=""
                        ></img>
                      </div>
                      <div className="col-sm-4">
                        <p>
                          {headlines.description}
                          <br />
                          {headlines.content} &nbsp;
                          <a href={headlines.url}>Read More</a>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default newspaper;
