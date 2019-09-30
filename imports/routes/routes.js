import { Meteor } from 'meteor/meteor'
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Lancamentos from '../ui/Lancamentos';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';

const unathenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/lancamentos'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/lancamentos");
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/lancamentos" component={Lancamentos} onEnter={onEnterPrivatePage} />
    <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="*" component={NotFound} />
  </Router>
);

window.browserHistory = browserHistory;

export const onAuthChange = (isAuthenticated) =>{
  const pathname = browserHistory.getCurrentLocation().pathname;
  const IsUnauthenticatedPage = unathenticatedPages.includes(pathname);
  const IsAuthenticatedPage = authenticatedPages.includes(pathname);

  if (IsUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/lancamentos");
  } else if (IsAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }
}