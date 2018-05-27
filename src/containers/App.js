import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';

import Home from './Home';

export default class App extends Component {
  state = {
    isLoginOpened: false,
    isRegisterOpened: false
  };

  render() {
    return (
      <BrowserRouter>
        <section>
          <Header />
          <Route exact path="/" component={Home} />
          <Footer />

          <Login isOpen={this.state.isLoginOpened} />
        </section>
      </BrowserRouter>
    );
  }
}
