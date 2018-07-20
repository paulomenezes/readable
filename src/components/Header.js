import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions/user';
import { loginModal, registerModal } from '../actions/ui';

const Header = props => {
  return (
    <section className="header">
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <h1 className="title">
              <Link to="/">
                readab<i className="has-text-primary">l</i>e
              </Link>
            </h1>
          </div>
          <div className="column is-6">
            {/* <div className="field">
              <p className="control has-icons-right">
                <input className="input" type="text" placeholder="Search for a community, post or user" name="search" />
                <span className="icon is-small is-right">
                  <i className="fas fa-search" />
                </span>
              </p>
            </div> */}
          </div>
          <div className="column is-3">
            {props.user ? (
              <div className="is-pulled-right">
                {props.user.name}{' '}
                <span className="is-link" onClick={() => props.logout()}>
                  (sair)
                </span>
              </div>
            ) : (
              <div className="field is-grouped is-pulled-right">
                <p className="control">
                  <button className="button" onClick={() => props.openLogin(true)}>
                    <span>Log in</span>
                  </button>
                </p>
                <p className="control">
                  <button className="button is-primary" onClick={() => props.openRegister(true)}>
                    <span>Sign up</span>
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
