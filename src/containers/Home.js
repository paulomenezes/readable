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

          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
