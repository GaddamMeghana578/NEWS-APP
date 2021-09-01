import { Link, Switch, Route, useLocation } from "react-router-dom";
import Newspaper from "./newspaper.js";
import Categories from "./categories.js";

const Header = () => {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <main>
      <nav>
        <ul className="nav nav-pills">
          <li className={splitLocation[1] === "" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li
            className={splitLocation[2] === "business" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/business">Business</Link>
          </li>
          <li
            className={splitLocation[2] === "entertainment" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/entertainment">Entertainment</Link>
          </li>
          <li
            className={splitLocation[2] === "general" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/general">General</Link>
          </li>
          <li
            className={splitLocation[2] === "health" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/health">Health</Link>
          </li>
          <li
            className={splitLocation[2] === "science" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/science">Science</Link>
          </li>
          <li
            className={splitLocation[2] === "sports" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/sports">Sports</Link>
          </li>
          <li
            className={splitLocation[2] === "technology" ? "active" : ""}
            role="presentation"
          >
            <Link to="/categories/technology">Technology</Link>
          </li>
        </ul>
      </nav>
      <br />
      <Switch>
        <Route path="/" exact component={Newspaper} />
        <Route path="/categories/:name" component={Categories} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </main>
  );
};

export default Header;
