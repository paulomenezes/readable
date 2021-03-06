import React from 'react';
import { connect } from 'react-redux';

import Post from '../components/Post';
import Loading from '../components/Loading';

import { getAll, getByCategory, vote } from '../actions/posts';
import { insertSubscription } from '../actions/subscription';
import { editSort } from '../actions/ui';

class PostList extends React.Component {
  componentDidMount() {
    if (this.props.isPopular) {
      this.props.getAll();
    } else if (!this.props.loadingCategories && this.props.category) {
      this.props.getByCategory(this.props.category.link);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.isPopular &&
      ((prevProps.category && prevProps.category.link !== this.props.category.link) ||
        (!prevProps.category && this.props.category && this.props.category.link))
    ) {
      this.props.getByCategory(this.props.category.link);
    }
  }

  sort = (a, b) => {
    switch (this.props.sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return b.timestamp - a.timestamp;
      default:
        return b.voteScore - a.voteScore;
    }
  };

  render() {
    return this.props.loadingPost || this.props.loadingCategories || (!this.props.isPopular && !this.props.category) ? (
      <Loading />
    ) : (
      <div>
        <div className="content">
          <div className="is-clearfix">
            <h1 className="is-pulled-left">{this.props.isPopular ? 'Popular' : this.props.category.name}</h1>
            <div className="is-pulled-right buttons" style={{ alignItems: 'self-start' }}>
              {!this.props.isPopular &&
                this.props.user && (
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
                )}

              <div className="buttons has-addons">
                <span
                  className={`button ${this.props.sort === 'votes' ? 'is-primary is-selected' : ''}`}
                  onClick={() => this.props.editSort('votes')}
                >
                  Votes
                </span>
                <span className={`button ${this.props.sort === 'date' ? 'is-primary is-selected' : ''}`} onClick={() => this.props.editSort('date')}>
                  Date
                </span>
                <span className={`button ${this.props.sort === 'name' ? 'is-primary is-selected' : ''}`} onClick={() => this.props.editSort('name')}>
                  Name
                </span>
              </div>
            </div>
          </div>
          <p>{this.props.isPopular ? "See what's interesting around you" : this.props.category.description}</p>
        </div>

        {this.props.posts &&
          this.props.posts.length === 0 && <div className="notification is-info">No one posts found, be the first and insert something</div>}

        {this.props.posts && this.props.posts.sort(this.sort).map(post => <Post key={post.id} post={post} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let category = undefined;
  // let loading = state.posts.loading;

  if (props.match.path !== '/') {
    if (state.categories.categories.length > 0) {
      category = state.categories.categories.filter(c => c.link === props.match.params.category);
      if (category.length > 0) {
        category = category[0];
      } else {
        props.history.push('/error');
      }
    } else {
      // loading = true;
    }
  }

  return {
    path: props.match.path,
    isPopular: props.match.path === '/',
    category,
    loadingCategories: state.categories.loading,
    loadingPost: state.posts.loading,
    posts: state.posts.posts,
    user: state.user.user,
    subscriptions: state.subscription.subscriptions,
    subscriptionLoading: state.subscription.loading,
    sort: state.ui.sort,
  };
};

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll()),
  getByCategory: category => dispatch(getByCategory(category)),
  insertSubscription: (category, user, remove) => dispatch(insertSubscription({ category, user }, remove)),
  vote: (post, type) => dispatch(vote(post, type)),
  editSort: sort => dispatch(editSort(sort)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
