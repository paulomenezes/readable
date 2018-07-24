import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser } from '../actions/user';
import { loadCategories } from '../actions/categories';
import { loadSubscriptions } from '../actions/subscription';

import Sidemenu from '../components/Sidemenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';
import CategoryForm from '../components/CategoryForm';
import PostForm from '../components/PostForm';
import ConfirmModal from '../components/ConfirmModal';

import PostList from './PostList';
import PostDetail from './PostDetail';

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
          <section className="container">
            <div className="columns">
              <div className="column is-3">
                <Sidemenu />
              </div>
              <div className="column is-9">
                <Route exact path="/" component={PostList} />
                <Route exact path="/:category" component={PostList} />
                <Route exact path="/:category/:id" component={PostDetail} />
              </div>
            </div>
          </section>

          <Footer />

          {/* Modals */}
          <Login />
          <Register />
          <CategoryForm />
          <PostForm />
          <ConfirmModal />
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
