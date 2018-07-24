import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addPostModal } from '../actions/ui';
import { insertPost } from '../actions/posts';

class PostForm extends React.Component {
  state = {
    title: '',
    description: '',
    category: undefined,
  };

  updateField = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditPost && this.props.isEditPost) {
      this.setState({
        title: this.props.post.name,
        description: this.props.post.description,
        category: this.props.post.category,
      });
    }
  }

  cleanState = () => {
    this.setState({
      title: '',
      description: '',
      category: undefined,
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            boxShadow: '0 0 50px 0 rgba(0, 0, 0, 0.5)',
            left: 'calc(50% - 250px)',
            width: 500,
            height: 420,
          },
        }}
      >
        <div className="content">
          <div className="is-clearfix">
            <h1 className="is-pulled-left">Add post</h1>
            <i
              className="is-pulled-right fas fa-times is-link"
              onClick={() => {
                this.props.openModal(false);
                this.cleanState();
              }}
            />
          </div>
          <br />
          <div className="field">
            <div className="select">
              <select onChange={event => this.updateField('category', event.target.value)} value={this.state.category}>
                <option>Select a category</option>
                {this.props.categories &&
                  this.props.categories.map(category => (
                    <option key={category.link} value={category.link}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={event => this.updateField('title', event.target.value)}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Text"
                name="description"
                onChange={event => this.updateField('description', event.target.value)}
                value={this.state.description}
              />
            </p>
            <i>You can use MarkDown</i>
          </div>
          <div className="field">
            <p className="control is-pulled-right">
              <button
                className={`button is-primary ${this.props.loading && 'is-loading'}`}
                disabled={this.props.loading || !this.state.title || !this.state.description || !this.state.category}
                onClick={() => {
                  this.props.insertPost(this.props.post, this.state.title, this.state.description, this.state.category, this.props.user);
                  this.cleanState();

                  if (this.props.post) {
                    this.props.history.push(`/${this.state.category}/${this.props.post.id}`);
                  } else {
                    this.props.history.push(`/${this.state.category}`);
                  }
                }}
              >
                {this.props.isEditPost ? 'Edit' : 'Create'}
              </button>
            </p>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.ui.isAddPostOpened,
  isEditPost: state.ui.editPostId,
  post: state.ui.editPostId && state.posts.posts.filter(p => p.id === state.ui.editPostId)[0],
  loading: state.posts.loading,
  categories: state.categories.categories,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  openModal: opened => dispatch(addPostModal(opened)),
  insertPost: (originalPost, name, description, category, user) => dispatch(insertPost({ originalPost, name, description, category, user })),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostForm)
);
