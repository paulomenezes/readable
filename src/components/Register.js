import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { registerModal, loginModal } from '../actions/ui';
import { checkUsernameAvailability } from '../actions/user';

const Register = props => {
  return (
    <Modal
      isOpen={props.isOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          border: 'none',
          boxShadow: '0 0 50px 0 rgba(0, 0, 0, 0.5)',
          left: 'calc(50% - 250px)',
          width: 500,
          height: 296
        }
      }}
    >
      <div className="content">
        <div className="is-clearfix">
          <h1 className="is-pulled-left">Register</h1>
          <i className="is-pulled-right fas fa-times is-link" onClick={() => props.openRegister(false)} />
        </div>
        <br />
        <div className="field">
          <p className="control">
            <input className="input" type="text" placeholder="Name" name="name" />
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Username"
              name="username"
              onBlur={event => props.checkUsernameAvailability(event.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" name="password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control is-pulled-right">
            <button className={`button is-primary ${props.loading && 'is-loading'}`} disabled={props.available || props.loading}>
              Register
            </button>
          </p>
        </div>
        <p>
          Already have an account?{' '}
          <button className="button is-text" onClick={() => props.openLogin(true)}>
            login
          </button>
        </p>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state, props) => ({
  isOpen: state.ui.isRegisterOpened,
  loading: state.user.loading,
  available: state.user.available
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened)),
  checkUsernameAvailability: username => dispatch(checkUsernameAvailability(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
