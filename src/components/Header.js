import React from 'react';

const Header = props => {
  return (
    <section className="header">
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <h1 className="title">
              readab<i className="has-text-primary">l</i>e
            </h1>
          </div>
          <div className="column is-6">
            <div className="field">
              <p className="control has-icons-right">
                <input className="input" type="text" placeholder="Search for a community, post or user" name="search" />
                <span className="icon is-small is-right">
                  <i className="fas fa-search" />
                </span>
              </p>
            </div>
          </div>
          <div className="column is-3">
            <div className="field is-grouped is-pulled-right">
              <p className="control">
                <button className="button" onClick={() => props.openModal('login')}>
                  <span>Log in</span>
                </button>
              </p>
              <p className="control">
                <button className="button is-primary" onClick={() => props.openModal('register')}>
                  <span>Sign up</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
