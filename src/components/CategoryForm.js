import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { addCategoryModal } from '../actions/ui';
import { insertCategory } from '../actions/categories';

class CategoryForm extends React.Component {
  state = {
    name: '',
    link: '',
    description: '',
  };

  updateField = (field, value) => {
    this.setState({
      [field]: value,
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
            height: 300,
          },
        }}
      >
        <div className="content">
          <div className="is-clearfix">
            <h1 className="is-pulled-left">Add category</h1>
            <i className="is-pulled-right fas fa-times is-link" onClick={() => this.props.openModal(false)} />
          </div>
          <br />
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={event => this.updateField('name', event.target.value)}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Link"
                name="link"
                value={this.state.link}
                onChange={event => this.updateField('link', event.target.value)}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={event => this.updateField('description', event.target.value)}
              />
            </p>
          </div>
          <div className="field">
            <p className="control is-pulled-right">
              <button
                className={`button is-primary ${this.props.loading && 'is-loading'}`}
                disabled={this.props.loading}
                onClick={() => this.props.insertCategory(this.state.name, this.state.link, this.state.description)}
              >
                Create
              </button>
            </p>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isOpen: state.ui.isAddCategoryOpened,
  loading: state.categories.loading,
});

const mapDispatchToProps = dispatch => ({
  openModal: opened => dispatch(addCategoryModal(opened)),
  insertCategory: (name, link, description) => dispatch(insertCategory({ name, link, description })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryForm);
