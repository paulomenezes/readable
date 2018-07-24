import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Markdown from 'react-remarkable';
import moment from 'moment';

import Vote from '../components/Vote';
import { vote } from '../actions/posts';
import { editPostModal, confirmModal } from '../actions/ui';

const Post = ({ post, vote, isPopular, user, editPostModal, confirmModal }) => (
  <div className="card">
    <Vote score={post.voteScore} onClick={type => vote(post, type)} />

    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">
            <Link to={`/${post.category}/${post.id}`}>{post.name}</Link>
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

        <div>
          {isPopular && (
            <Link to={`/${post.category}`} className="mr-5">
              <span className="tag is-primary">/{post.category}</span>
            </Link>
          )}
          {<span className="tag is-primary">Comments: {post.commentCount}</span>}
          {post.deleted && <span className="tag is-danger">This post was deleted</span>}
        </div>

        {user &&
          user.username === post.author &&
          !post.deleted && (
            <div>
              <br />
              <p className="buttons">
                <button className="button is-primary is-outlined" onClick={() => editPostModal(post.id)}>
                  <span className="icon is-small">
                    <i className="far fa-edit" />
                  </span>
                  <span>Edit</span>
                </button>
                <button className="button is-danger is-outlined" onClick={() => confirmModal(post)}>
                  <span className="icon is-small">
                    <i className="fas fa-times" />
                  </span>
                  <span>Delete</span>
                </button>
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
  confirmModal: post => dispatch(confirmModal(true, 'post', post)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
