import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { loginModal, registerModal } from '../actions/ui';
import { login } from '../actions/user';

class Login extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
  };

  updateField = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            boxShadow: '0 0 50px 0 rgba(0, 0, 0, 0.5)',
            left: 'calc(50% - 250px)',
            width: 500,
            height: 248,
          },
        }}
      >
        <div className="content">
          <div className="is-clearfix">
            <h1 className="is-pulled-left">Log in</h1>
            <i className="is-pulled-right fas fa-times is-link" onClick={() => this.props.openLogin(false)} />
          </div>
          <br />
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={event => this.updateField('username', event.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={event => this.updateField('password', event.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control is-pulled-right">
              <button className="button is-primary" onClick={() => this.props.login(this.state.username, this.state.password)}>
                Login
              </button>
            </p>
          </div>
          <p>
            New to readable?{' '}
            <button className="button is-text" onClick={() => this.props.openRegister(true)}>
              sign up
            </button>
          </p>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.ui.isLoginOpened,
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened)),
  login: (username, password) => dispatch(login({ username, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
