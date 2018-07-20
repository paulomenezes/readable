import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Markdown from 'react-remarkable';
import moment from 'moment';

class Post extends React.Component {
  componentWillReceiveProps(prevProps) {
    if (prevProps) {
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { post, vote, isPopular, postTeste } = this.props;
    return (
      <div className="card">
        <div className="card-votes">
          <i onClick={() => vote(post, 'up')} className="fas fa-chevron-up" />
          <div>
            {post.voteScore}
            {postTeste.voteScore}
          </div>
          <i onClick={() => vote(post, 'down')} className="fas fa-chevron-down" />
        </div>

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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    postTeste: state.posts.posts.filter(p => p.id === props.post.id)[0],
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
