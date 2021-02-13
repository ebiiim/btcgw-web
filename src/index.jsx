import "bulma/css/bulma.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import { SectionTopPage, SectionGetAPIKey, SectionGetDomAndTx, SectionAnchorRecord } from "./App";

const app = document.querySelector("#app")
ReactDOM.render(
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={SectionTopPage}></Route>
      <Route exact path="/ledgers" component={SectionGetDomAndTx}></Route>
      <Route path="/ledgers/domains/:dom/transactions/:tx" component={SectionAnchorRecord}></Route>
      <Route exact path="/apikeys" component={SectionGetAPIKey}></Route>
    </Switch>
    <Footer />
  </Router>, app);
