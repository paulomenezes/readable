import React from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-remarkable';
import moment from 'moment';

const Post = ({ post, vote, isPopular }) => (
  <div className="card">
    <div className="card-votes">
      <i onClick={() => vote(post, 'up')} className="fas fa-chevron-up" />
      <div>{post.voteScore}</div>
      <i onClick={() => vote(post, 'down')} className="fas fa-chevron-down" />
    </div>

    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">
            <Link to={`e/${post.category}/${post.id}`}>{post.name}</Link>
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
          <Link to={`e/${post.category}`}>
            <span className="tag is-danger">e/{post.category}</span>
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default Post;
