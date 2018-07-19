import React from 'react';
import { connect } from 'react-redux';

import Sidemenu from '../components/Sidemenu';
import Post from '../components/Post';

import { getAll, getByCategory } from '../actions/posts';
import { insertSubscription } from '../actions/subscription';

class Home extends React.Component {
  componentDidMount() {
    if (this.props.isPopular) {
      this.props.getPosts(undefined);
    } else if (!this.props.loading) {
      this.props.getPosts(this.props.category.link);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.isPopular &&
      ((prevProps.loading && !this.props.loading) || (prevProps.category && prevProps.category.link !== this.props.category.link))
    ) {
      this.props.getPosts(this.props.category.link);
    }
  }

  render() {
    return (
      <section className="container">
        <div className="columns">
          <div className="column is-3">
            <Sidemenu />
          </div>
          <div className="column is-9">
            {this.props.loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div className="content">
                  <div className="is-clearfix">
                    <h1 className="is-pulled-left">{this.props.isPopular ? 'Popular' : this.props.category.name}</h1>
                    {!this.props.isPopular &&
                      this.props.user && (
                        <div className="is-pulled-right">
                          <button
                            className={`button is-primary ${this.props.subscriptionLoading ? 'is-loading' : ''}`}
                            onClick={() =>
                              this.props.insertSubscription(
                                this.props.category,
                                this.props.user,
                                this.props.subscriptions && this.props.subscriptions.filter(s => s.category === this.props.category.link).length > 0
                              )
                            }
                          >
                            <span>
                              {this.props.subscriptions && this.props.subscriptions.filter(s => s.category === this.props.category.link).length
                                ? 'Subscribed'
                                : 'Subscribe'}
                            </span>
                          </button>
                        </div>
                      )}
                  </div>
                  <p>{this.props.isPopular ? "See what's interesting around you" : this.props.category.description}</p>

                  <div>
                    <span className="icon is-medium has-text-primary">
                      <i className="fas fa-th-list" />
                    </span>
                    <span className="icon is-medium">
                      <i className="fas fa-th-large" />
                    </span>
                  </div>
                </div>

                {this.props.posts && this.props.posts.sort((a, b) => b.voteScore - a.voteScore).map(post => <Post key={post.id} post={post} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  let category = undefined;
  let loading = false;

  if (props.match.path !== '/') {
    if (state.categories.categories.length > 0) {
      category = state.categories.categories.filter(c => c.link === props.match.params.category);
      if (category.length > 0) {
        category = category[0];
      } else {
        props.history.push('/error');
      }
    } else {
      loading = true;
    }
  }

  return {
    path: props.match.path,
    isPopular: props.match.path === '/',
    category,
    loading,
    posts: state.posts.posts,
    user: state.user.user,
    subscriptions: state.subscription.subscriptions,
    subscriptionLoading: state.subscription.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  getPosts: category => dispatch(category ? getByCategory(category) : getAll()),
  insertSubscription: (category, user, remove) => dispatch(insertSubscription({ category, user }, remove)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
