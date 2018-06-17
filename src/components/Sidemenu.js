import React from 'react';
import { connect } from 'react-redux';

import { loginModal, registerModal } from '../actions/ui';

const Sidemenu = props => {
  return (
    <aside>
      <p className="menu-label">feeds</p>
      <ul className="menu-list">
        <li>
          <a className="is-active">
            <span className="icon">
              <i className="fas fa-fire" />
            </span>
            Popular
          </a>
        </li>
        <li>
          <a>
            <span className="icon">
              <i className="fas fa-chart-line" />
            </span>
            All
          </a>
        </li>
      </ul>

      <div className="divider" />

      {props.user ? (
        <div>
          <button className="button is-primary">Create a post</button>
        </div>
      ) : (
        <div>
          <p className="has-text-centered has-text-primary is-size-2 is-italic">l</p>
          <p className="has-text-centered has-text-weight-semibold">Sign up and stay connected to your favorite communities.</p>

          <div className="field vertical-buttons">
            <p className="control">
              <button className="button is-primary" onClick={() => props.openRegister(true)}>
                <span>Sign up</span>
              </button>
            </p>
            <br />
            <p className="control">
              <button className="button is-white" onClick={() => props.openLogin(true)}>
                <span>Log in</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidemenu);
