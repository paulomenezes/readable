import React from 'react';

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

      <p className="has-text-centered has-text-primary is-size-2 is-italic">l</p>
      <p className="has-text-centered has-text-weight-semibold">Sign up and stay connected to your favorite communities.</p>

      <div className="field vertical-buttons">
        <p className="control">
          <a className="button is-primary" href="#">
            <span>Sign up</span>
          </a>
        </p>
        <br />
        <p className="control">
          <a className="button is-white" href="#">
            <span>Log in</span>
          </a>
        </p>
      </div>
    </aside>
  );
};

export default Sidemenu;
