import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { removePost } from '../actions/posts';
import { removeComment } from '../actions/comments';
import { confirmModal } from '../actions/ui';

const ConfirmModal = props => (
  <Modal
    isOpen={props.isOpen}
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
        height: 200,
      },
    }}
  >
    <div className="content">
      <div className="is-clearfix">
        <h1 className="is-pulled-left">Remove {props.title}</h1>
        <i className="is-pulled-right fas fa-times is-link" onClick={props.closeModal} />
      </div>
      <br />
      <section>Are you sure do you want to remove this {props.title}?</section>
      <br />
      <footer className="buttons">
        <button
          className="button is-primary"
          onClick={() => (props.title === 'post' ? props.removePost(props.item) : props.removeComment(props.item, props.commentPost))}
        >
          Yes, remove it
        </button>
        <button className="button" onClick={props.closeModal}>
          Cancel
        </button>
      </footer>
    </div>
  </Modal>
);

const mapStateToProps = state => ({
  title: state.ui.confirmModalTitle,
  isOpen: state.ui.isConfirmModalOpened,
  item: state.ui.confirmModalItemToRemove,
  commentPost: state.ui.editCommentPost,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(confirmModal(false, undefined)),
  removePost: post => dispatch(removePost(post)),
  removeComment: (comment, post) => dispatch(removeComment(comment, post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmModal);
