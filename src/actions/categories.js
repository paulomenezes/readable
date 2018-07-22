import { addCategoryModal } from './ui';
import * as CategoryAPI from '../services/category';

export const CATEGORY_LOADING = 'CATEGORY_LOADING';
export const CATEGORY_LOAD = 'CATEGORY_LOAD';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';

export const isLoading = (loading = true) => ({
  type: CATEGORY_LOADING,
  loading,
});

export const categoryLoad = categories => ({
  type: CATEGORY_LOAD,
  categories,
});

export const categorySuccess = category => ({
  type: CATEGORY_SUCCESS,
  category,
});

export const categoryError = () => ({
  type: CATEGORY_ERROR,
});

export const loadCategories = () => async dispatch => {
  dispatch(isLoading(true));

  try {
    const response = await CategoryAPI.getAll();
    let categories = await response.json();

    if (categories) {
      categories = Object.values(categories);
    }

    dispatch(categoryLoad(categories));
  } catch (error) {
    dispatch(categoryError());
  }
};

export const insertCategory = ({ name, link, description }) => async dispatch => {
  dispatch(isLoading());

  if (name && link) {
    try {
      const category = { name, link, description };

      await CategoryAPI.insertCategory(category);

      dispatch(categorySuccess(category));
      dispatch(addCategoryModal(false));
    } catch (error) {
      dispatch(categoryError());
    }
  }
};
