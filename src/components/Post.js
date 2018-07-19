import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Markdown from 'react-remarkable';
import moment from 'moment';

import { vote } from '../actions/posts';

const Post = ({ post, vote, isPopular }) => (
  <div className="card" key={post.id}>
    <div className="card-votes">
      <i onClick={() => vote(post, 'up')} className="fas fa-chevron-up" />
      <div>{post.voteScore}</div>
      <i onClick={() => vote(post, 'down')} className="fas fa-chevron-down" />
    </div>

    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{post.name}</p>
        </div>
      </div>

      <div className="content">
        <Markdown>{post.description}</Markdown>
        <br />
        <time date="2016-1-1">
          {post.author}, {moment(post.timestamp).fromNow()}
        </time>
        <br />
        {isPopular && (
          <Link to={`e/${post.category}`}>
            <span className="tag is-danger">e/{post.category}</span>
          </Link>
        )}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    isPopular: props.match.path === '/',
  };
};

const mapDispatchToProps = dispatch => ({
  vote: (post, type) => dispatch(vote(post, type)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
