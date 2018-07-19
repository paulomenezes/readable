import React from 'react';
import { connect } from 'react-redux';

import { getById, vote } from '../actions/posts';
import Post from '../components/Post';

class PostDetail extends React.Component {
  componentDidMount() {
    if (!this.props.post) {
      this.props.getPost(this.props.match.params.category, this.props.match.params.id);
    }
  }

  render() {
    return this.props.post ? <Post post={this.props.post} vote={this.props.vote} /> : 'loading...';
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.posts.filter(p => p.id === props.match.params.id)[0],
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: (category, id) => dispatch(getById(category, id)),
  vote: (post, type) => dispatch(vote(post, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
