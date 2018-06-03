import React from 'react';
import Modal from 'react-modal';

const Login = props => {
  return (
    <Modal
      isOpen={props.isOpen}
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
          <i className="is-pulled-right fas fa-times is-link" onClick={props.closeModal} />
        </div>
        <br />
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="email" placeholder="Email" name="email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" name="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control is-pulled-right">
            <button class="button is-primary">Login</button>
          </p>
        </div>
        <p>
          New to readable? <button className="button is-text">sign up</button>
        </p>
      </div>
    </Modal>
  );
};

export default Login;
