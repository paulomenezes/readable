import React from 'react';
import { connect } from 'react-redux';

import { vote } from '../actions/posts';

const Vote = ({ post, vote }) => (
  <div className="card-votes">
    <i onClick={() => vote(post, 'up')} className="fas fa-chevron-up" />
    <div>{post.voteScore}</div>
    <i onClick={() => vote(post, 'down')} className="fas fa-chevron-down" />
  </div>
);

const mapDispatchToProps = dispatch => ({
  vote: (post, type) => dispatch(vote(post, type)),
});

export default connect(
  null,
  mapDispatchToProps
)(Vote);
