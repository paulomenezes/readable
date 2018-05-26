import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Home from './Home';
import Login from './Login';
import Register from './Register';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Footer />
        </section>
      </BrowserRouter>
    );
  }
}
