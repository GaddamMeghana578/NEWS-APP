import { React, Component } from "react";
import axios from "axios";
import teslaAd from "./images/teslaAd.jpeg";

class categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryNews: [],
      isLoading: false,
      error: "",
    };
  }
  getCategoryNews = (category) => {
    axios
      .get("https://newsapi.org/v2/top-headlines", {
        params: {
          q: category,
          country: "us",
          apikey: "fe663596255749a58b75b2e4eb8d71c0",
        },
      })
      .then((response) => {
        const news = response.data.articles;
        this.setState({ categoryNews: news, isLoading: true });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  componentDidMount = () => {
    const category = this.props.match.params.name;
    this.getCategoryNews(category);
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      const category = this.props.match.params.name;
      this.getCategoryNews(category);
    }
  };

  render() {
    const { isLoading, categoryNews } = this.state;
    console.log("categoryNews:", categoryNews);
    return (
      <div className="container">
        {isLoading && categoryNews.length > 0 ? (
          <div>
            {" "}
            ADVERTISEMENT
            <img src={teslaAd} className="img-responsive" alt="Responsive" />
            {categoryNews.map((news, i) => {
              return (
                <div key={i}>
                  {news.urlToImage !== null &&
                  news.description !== null &&
                  news.content !== null ? (
                    <div>
                      <span className="col-sm-9">
                        <h3>{news.title}</h3>
                        <p>
                          {news.author !== "" && news.author !== null
                            ? `By: ${news.author}`
                            : ""}{" "}
                        </p>
                      </span>
                      <div className="row">
                        <div className="col-sm-5">
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={
                              news.urlToImage !== null ? news.urlToImage : null
                            }
                            className="img-thumbnail"
                            alt=""
                          ></img>
                        </div>
                        <div className="col-sm-4">
                          <p>
                            {news.description}
                            <br />
                            {news.content} &nbsp;
                            <a href={news.url}>Read More</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <span>
            {categoryNews.length === 0 ? (
              <h3>No News Available...</h3>
            ) : (
              "Loading..."
            )}
          </span>
        )}
      </div>
    );
  }
}

export default categories;
