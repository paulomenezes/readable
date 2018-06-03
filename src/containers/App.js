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

  openModal = modal => {
    if (modal === 'login') {
      this.setState({
        isLoginOpened: true
      });
    } else if (modal === 'register') {
      this.setState({
        isRegisterOpened: true
      });
    }
  };

  closeModal = () => {
    this.setState({
      isLoginOpened: false,
      isRegisterOpened: false
    });
  };

  render() {
    return (
      <BrowserRouter>
        <section>
          <Header openModal={this.openModal} />
          <Route exact path="/" component={Home} />
          <Footer />

          <Login isOpen={this.state.isLoginOpened} openModal={this.openModal} closeModal={this.closeModal} />
        </section>
      </BrowserRouter>
    );
  }
}
