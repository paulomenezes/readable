import React from 'react';
import Sidemenu from '../components/Sidemenu';

const Home = props => {
  return (
    <section className="container">
      <div className="columns">
        <div className="column is-3">
          <Sidemenu />
        </div>
        <div className="column is-9">
          <div className="content">
            <h1>Popular</h1>
            <p>See what's interesting around you</p>

            <div>
              <span className="icon is-medium has-text-primary">
                <i className="fas fa-th-list" />
              </span>
              <span className="icon is-medium">
                <i className="fas fa-th-large" />
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Title</p>
                </div>
              </div>

              <div className="content">
                Body.
                <br />
                <p className="subtitle is-6">Paulo Menezes</p>
                <time date="2016-1-1">an hour ago</time>
                <br />
                <span className="tag is-danger">e/react</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
