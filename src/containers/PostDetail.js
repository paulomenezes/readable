import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';
import moment from 'moment';

import { getAll, vote } from '../actions/posts';
import { getByPost, insertComment, vote as commentVote, cleanComments } from '../actions/comments';
import { editComment, confirmModal } from '../actions/ui';

import Post from '../components/Post';
import Loading from '../components/Loading';
import Vote from '../components/Vote';

class PostDetail extends React.Component {
  state = {
    description: '',
  };

  constructor(props) {
    super(props);

    this.commentInputRef = React.createRef();
  }

  updateField = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  componentDidMount() {
    if (!this.props.post) {
      this.props.getPost();
    } else {
      this.props.getByPost(this.props.post);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.post && this.props.post) {
      this.props.getByPost(this.props.post);
    }

    if (prevProps.commentToEdit !== this.props.commentToEdit) {
      this.setState({
        description: this.props.commentToEdit ? this.props.commentToEdit.description : '',
      });
    }
  }

  componentWillUnmount() {
    this.props.cleanComments();
  }

  submit = () => {
    this.props.insertComment(this.props.post, this.props.user, this.state.description, this.props.commentToEdit);

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
        {this.props.postSuccess && this.props.post ? (
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
                              ref={this.commentInputRef}
                              className="textarea"
                              placeholder="Add a comment..."
                              onChange={event => this.updateField('description', event.target.value)}
                              value={this.state.description}
                            />
                          </p>
                        </div>
                        <nav className="level">
                          <div className="level-left">
                            <div className="level-item buttons">
                              <button
                                type="submit"
                                className={`button is-primary ${this.props.commentLoading ? 'is-loading' : ''}`}
                                onClick={this.submit}
                              >
                                {this.props.commentToEdit ? 'Edit' : 'Submit'}
                              </button>
                              {this.props.commentToEdit && (
                                <button type="submit" className="button is-outlined" onClick={() => this.props.editComment(undefined)}>
                                  Cancel
                                </button>
                              )}
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
                this.props.comments
                  .filter(c => !c.deleted)
                  .sort(this.commentsSort)
                  .map(comment => (
                    <div className="card" key={comment.id}>
                      <Vote score={comment.voteScore} onClick={type => this.props.commentVote(comment, type)} />

                      <div className="card-content">
                        <div className="content">
                          <Markdown>{comment.description}</Markdown>
                          <br />
                          <time>
                            {comment.author}, {moment(comment.timestamp).fromNow()}
                          </time>

                          {this.props.user &&
                            this.props.user.username === comment.author &&
                            !comment.deleted && (
                              <div>
                                <br />
                                <p className="buttons">
                                  <button
                                    className="button is-primary is-outlined"
                                    onClick={() => {
                                      this.props.editComment(comment);
                                      this.commentInputRef.current.focus();
                                    }}
                                  >
                                    <span className="icon is-small">
                                      <i className="far fa-edit" />
                                    </span>
                                    <span>Edit</span>
                                  </button>
                                  <button className="button is-danger is-outlined" onClick={() => this.props.confirmModal(comment, this.props.post)}>
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
                  ))}
            </div>
          </div>
        ) : this.props.postSuccess ? (
          <div className="notification is-info">Post not found, sorry</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.posts.filter(p => p.id === props.match.params.id)[0],
    postSuccess: state.posts.success,
    user: state.user.user,
    comments: state.comments.comments,
    commentToEdit: state.ui.editComment,
    commentPost: state.ui.editCommentPost,
    commentLoading: state.comments.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: () => dispatch(getAll()),
  vote: (post, type) => dispatch(vote(post, type)),
  commentVote: (comment, type) => dispatch(commentVote(comment, type)),
  getByPost: post => dispatch(getByPost(post)),
  insertComment: (post, user, description, commentToEdit) => dispatch(insertComment(post, user, description, commentToEdit)),
  cleanComments: () => dispatch(cleanComments()),
  editComment: comment => dispatch(editComment(comment)),
  confirmModal: (comment, post) => dispatch(confirmModal(true, 'comment', comment, post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
