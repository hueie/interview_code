import * as React from "react";
import { Link, Route, Switch } from "react-router-dom";

import pages from "../pages";

const routes: JSX.Element = (
    <Switch>
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" id="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                    <span className="sr-only">Toggle navigation</span> MENU <i className="fa fa-bars"/>
                </button>
                <a className="navbar-brand page-scroll" href="#/!">Hagglerz</a>
            </div>
            <div className="collapse navbar-collapse"  id="navbar-collapse">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/itemlist">Item List</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr />
        <Route exact={true} path="/" component={pages.MainPage} />
        <Route path="/itemlist" component={pages.ItemlistPage}/>
        <Route path="/about" component={pages.AboutPage}/>
      </div>
    </Switch>
);

export default routes;
