import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loginModal, registerModal, addCategoryModal, addPostModal } from '../actions/ui';

const Sidemenu = props => {
  return (
    <aside>
      <p className="menu-label">feeds</p>
      <ul className="menu-list">
        <li>
          <NavLink to="/" exact activeClassName="is-active">
            <span className="icon">
              <i className="fas fa-fire" />
            </span>
            Popular
          </NavLink>
        </li>
      </ul>

      <div className="divider" />

      {props.subscriptions &&
        props.subscriptions.length > 0 && (
          <div>
            <p className="menu-label">subscriptions</p>
            <ul className="menu-list">
              {props.subscriptions.map(subscription => (
                <li key={subscription.category}>
                  <NavLink to={`/${subscription.category}`} activeClassName="is-active">
                    /{subscription.category}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="divider" />
          </div>
        )}

      <div>
        <p className="menu-label">categories</p>
        <ul className="menu-list">
          {props.categories &&
            props.categories.map(category => (
              <li key={category.link}>
                <NavLink to={`/${category.link}`} activeClassName="is-active">
                  /{category.link}
                </NavLink>
              </li>
            ))}
        </ul>

        <div className="divider" />
      </div>

      {props.user ? (
        <div className="field vertical-buttons">
          <button className="button is-primary" onClick={() => props.openAddCategory(true)}>
            <span className="icon">
              <i className="far fa-object-ungroup" />
            </span>
            <span>Create a category</span>
          </button>

          <br />

          <button className="button is-primary" onClick={() => props.openAddPost(true)}>
            <span className="icon">
              <i className="far fa-edit" />
            </span>
            <span>Create a post</span>
          </button>
        </div>
      ) : (
        <div>
          <p className="has-text-centered has-text-primary is-size-2 is-italic">l</p>
          <p className="has-text-centered has-text-weight-semibold">Sign up and stay connected to your favorite communities.</p>

          <div className="field vertical-buttons">
            <p className="control">
              <button className="button is-primary" onClick={() => props.openRegister(true)}>
                <span>Sign up</span>
              </button>
            </p>
            <br />
            <p className="control">
              <button className="button is-white" onClick={() => props.openLogin(true)}>
                <span>Log in</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  subscriptions: state.subscription.subscriptions,
  categories: state.categories.categories,
  currentCategory: props.match && props.match.params && props.match.params.category,
});

const mapDispatchToProps = dispatch => ({
  openLogin: opened => dispatch(loginModal(opened)),
  openRegister: opened => dispatch(registerModal(opened)),
  openAddCategory: opened => dispatch(addCategoryModal(opened)),
  openAddPost: opened => dispatch(addPostModal(opened)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidemenu)
);
