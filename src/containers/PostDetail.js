import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';
import moment from 'moment';

import { getById, vote } from '../actions/posts';
import { getByPost, insertComment, vote as commentVote, cleanComments } from '../actions/comments';
import Post from '../components/Post';

import Vote from '../components/Vote';

class PostDetail extends React.Component {
  state = {
    comment: '',
  };

  updateField = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  componentDidMount() {
    if (!this.props.post) {
      this.props.getPost(this.props.match.params.category, this.props.match.params.id);
    } else {
      this.props.getByPost(this.props.post);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.post && this.props.post) {
      this.props.getByPost(this.props.post);
    }
  }

  componentWillUnmount() {
    this.props.cleanComments();
  }

  submit = () => {
    this.props.insertComment(this.props.post, this.props.user, this.state.description);

    this.setState({
      description: '',
    });
  };

  commentsSort = (a, b) => {
    if (a.voteScore === b.voteScore) {
      return b.timestamp - a.timestamp;
    }

    return b.voteScore - a.voteScore;
  };

  render() {
    return (
      <div>
        {this.props.post ? (
          <div>
            <Post />

            {this.props.user && (
              <div>
                <br />
                <div className="card">
                  <div className="card-content">
                    <article className="media">
                      <div className="media-content">
                        <div className="field">
                          <p className="control">
                            <textarea
                              className="textarea"
                              placeholder="Add a comment..."
                              onChange={event => this.updateField('description', event.target.value)}
                              value={this.state.description}
                            />
                          </p>
                        </div>
                        <nav className="level">
                          <div className="level-left">
                            <div className="level-item">
                              <button type="submit" className="button is-primary" onClick={this.submit}>
                                Submit
                              </button>
                            </div>
                          </div>
                          <div className="level-right">
                            <div className="level-item">
                              <i>The comments supports MarkDown</i>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            )}

            <div>
              <br />
              {this.props.comments &&
                this.props.comments.sort(this.commentsSort).map(comment => (
                  <div className="card" key={comment.id}>
                    <Vote score={comment.voteScore} onClick={type => this.props.commentVote(comment, type)} />

                    <div className="card-content">
                      <div className="content">
                        <Markdown>{comment.description}</Markdown>
                        <br />
                        <time>
                          {comment.author}, {moment(comment.timestamp).fromNow()}
                        </time>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          'loading...'
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.posts.filter(p => p.id === props.match.params.id)[0],
    user: state.user.user,
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: (category, id) => dispatch(getById(category, id)),
  vote: (post, type) => dispatch(vote(post, type)),
  commentVote: (comment, type) => dispatch(commentVote(comment, type)),
  getByPost: post => dispatch(getByPost(post)),
  insertComment: (post, user, description) => dispatch(insertComment(post, user, description)),
  cleanComments: () => dispatch(cleanComments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
