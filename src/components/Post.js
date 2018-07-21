import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Markdown from 'react-remarkable';
import moment from 'moment';

import Vote from '../components/Vote';
import { vote } from '../actions/posts';
import { editPostModal } from '../actions/ui';

const Post = ({ post, vote, isPopular, user, editPostModal }) => (
  <div className="card">
    <Vote score={post.voteScore} onClick={type => vote(post, type)} />

    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">
            <Link to={`/e/${post.category}/${post.id}`}>{post.name}</Link>
          </p>
        </div>
      </div>

      <div className="content">
        <Markdown>{post.description}</Markdown>
        <br />
        <time>
          {post.author}, {moment(post.timestamp).fromNow()}
        </time>
        <br />
        {isPopular && (
          <Link to={`/e/${post.category}`}>
            <span className="tag is-primary">e/{post.category}</span>
          </Link>
        )}

        {user &&
          user.username === post.author && (
            <div>
              <br />
              <p className="buttons">
                <button className="button is-primary is-outlined" onClick={() => editPostModal(post.id)}>
                  <span className="icon is-small">
                    <i className="far fa-edit" />
                  </span>
                  <span>Edit</span>
                </button>
                <a className="button is-danger is-outlined">
                  <span className="icon is-small">
                    <i className="fas fa-times" />
                  </span>
                  <span>Delete</span>
                </a>
              </p>
            </div>
          )}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    post: props.post ? props.post : state.posts.posts.filter(p => p.id === props.match.params.id)[0],
    isPopular: props.match.path === '/',
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => ({
  vote: (post, type) => dispatch(vote(post, type)),
  editPostModal: postId => dispatch(editPostModal(true, postId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
