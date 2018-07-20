import * as SubscriptionAPI from '../services/subscription';

export const SUBSCRIPTION_LOADING = 'SUBSCRIPTION_LOADING';
export const SUBSCRIPTION_LOAD = 'SUBSCRIPTION_LOAD';
export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS';
export const SUBSCRIPTION_REMOVE_SUCCESS = 'SUBSCRIPTION_REMOVE_SUCCESS';
export const SUBSCRIPTION_ERROR = 'SUBSCRIPTION_ERROR';
export const SUBSCRIPTION_CLEAN = 'SUBSCRIPTION_CLEAN';

export const isLoading = (loading = true) => ({
  type: SUBSCRIPTION_LOADING,
  loading,
});

export const subscriptionLoad = subscriptions => ({
  type: SUBSCRIPTION_LOAD,
  subscriptions,
});

export const subscriptionSuccess = subscription => ({
  type: SUBSCRIPTION_SUCCESS,
  subscription,
});

export const subscriptionRemoveSuccess = subscription => ({
  type: SUBSCRIPTION_REMOVE_SUCCESS,
  subscription,
});

export const subscriptionError = () => ({
  type: SUBSCRIPTION_ERROR,
});

export const subscriptionClean = () => ({
  type: SUBSCRIPTION_CLEAN,
});

export const loadSubscriptions = user => async dispatch => {
  try {
    const response = await SubscriptionAPI.getByUser(user.username);
    let subscriptions = await response.json();

    if (subscriptions) {
      subscriptions = Object.values(subscriptions);
    }

    dispatch(subscriptionLoad(subscriptions));
  } catch (error) {
    dispatch(subscriptionError());
  }
};

export const insertSubscription = ({ category, user }, remove) => async dispatch => {
  dispatch(isLoading());

  if (category && user) {
    try {
      const subscription = {
        category: category.link,
        user: user.username,
      };

      if (remove) {
        await SubscriptionAPI.removeSubscription(subscription);
        dispatch(subscriptionRemoveSuccess(subscription));
      } else {
        await SubscriptionAPI.insertSubscription(subscription);
        dispatch(subscriptionSuccess(subscription));
      }
    } catch (error) {
      dispatch(subscriptionError());
    }
  }
};

export const cleanSubscription = () => dispatch => {
  dispatch(subscriptionClean());
};
