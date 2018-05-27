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
        <h1>Log in</h1>
        <br />
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" />
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
          New to readable? <a href="#">sign up</a>
        </p>
      </div>
    </Modal>
  );
};

export default Login;
