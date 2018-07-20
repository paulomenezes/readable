import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PostList from './PostList';
import PostDetail from './PostDetail';
import Sidemenu from '../components/Sidemenu';

const Home = () => (
  <section className="container">
    <div className="columns">
      <div className="column is-3">
        <Sidemenu />
      </div>
      <div className="column is-9">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/e/:category" component={PostList} />
          <Route exact path="/e/:category/:id" component={PostDetail} />
        </Switch>
      </div>
    </div>
  </section>
);

export default Home;
