import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { registerModal, loginModal } from '../actions/ui';
import { checkUsernameAvailability } from '../actions/userCheck';
import { insertUser } from '../actions/user';

class Register extends React.Component {
  state = {
    name: '',
    username: '',
    password: ''
  };

  updateField = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
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
            <i className="is-pulled-right fas fa-times is-link" onClick={() => this.props.openRegister(false)} />
          </div>
          <br />
          <div className="field">
            <p className="control">
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Name"
                value={this.state.name}
                onChange={event => this.updateField('name', event.target.value)}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                type="text"
                name="username"
                className="input"
                placeholder="Username"
                value={this.state.username}
                onChange={event => this.updateField('username', event.target.value)}
                onBlur={event => this.props.checkUsernameAvailability(event.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
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
              <button
                className={`button is-primary ${this.props.loading && 'is-loading'}`}
                disabled={this.props.available || this.props.loading}
                onClick={() => this.props.insertUser(this.state)}
              >
                Register
              </button>
            </p>
          </div>
          <p>
            Already have an account?{' '}
            <button className="button is-text" onClick={() => this.props.openLogin(true)}>
              login
            </button>
          </p>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.ui.isRegisterOpened,
  loading: state.userCheck.loading || state.user.loading,
  available: state.userCheck.available,
  success: state.user.success,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened)),
  checkUsernameAvailability: username => dispatch(checkUsernameAvailability(username)),
  insertUser: user => dispatch(insertUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
