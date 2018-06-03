import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { loginModal, registerModal } from '../actions/ui';

const Login = props => {
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
          height: 248
        }
      }}
    >
      <div className="content">
        <div className="is-clearfix">
          <h1 className="is-pulled-left">Log in</h1>
          <i className="is-pulled-right fas fa-times is-link" onClick={() => props.openLogin(false)} />
        </div>
        <br />
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="email" placeholder="Email" name="email" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
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
            <button className="button is-primary">Login</button>
          </p>
        </div>
        <p>
          New to readable?{' '}
          <button className="button is-text" onClick={() => props.openRegister(true)}>
            sign up
          </button>
        </p>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state, props) => ({
  isOpen: state.ui.isLoginOpened
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
