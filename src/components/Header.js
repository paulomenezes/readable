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
                <input className="input" type="text" placeholder="Search for a community, post or user" />
                <span className="icon is-small is-right">
                  <i className="fas fa-search" />
                </span>
              </p>
            </div>
          </div>
          <div className="column is-3">
            <div className="field is-grouped is-pulled-right">
              <p className="control">
                <a className="button" href="#">
                  <span>Log in</span>
                </a>
              </p>
              <p className="control">
                <a className="button is-primary" href="#">
                  <span>Sign up</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
