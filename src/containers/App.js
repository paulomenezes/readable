import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser } from '../actions/user';
import { loadCategories } from '../actions/categories';
import { loadSubscriptions } from '../actions/subscription';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';
import CategoryForm from '../components/CategoryForm';
import PostForm from '../components/PostForm';

import Home from './Home';

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadCategories();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.props.loadSubscriptions(this.props.user);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <section>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/e/:category" component={Home} />

          <Footer />

          {/* Modals */}
          <Login />
          <Register />
          <CategoryForm />
          <PostForm />
        </section>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
  loadCategories: () => dispatch(loadCategories()),
  loadSubscriptions: user => dispatch(loadSubscriptions(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
