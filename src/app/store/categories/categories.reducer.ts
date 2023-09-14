import { createReducer, on } from '@ngrx/store';

import { GetCategories } from 'src/app/interfaces/api-categories-responses';
import { categoriesActions } from './categories.action';

export interface CategoriesState extends GetCategories {
  loading: boolean;
  success: boolean;
}

export const initialCategoriesState: CategoriesState = {
  total: 0,
  limit: 0,
  offset: 0,
  categories: [],
  loading: false,
  success: false,
};

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(categoriesActions.getCategories, (state) => ({ ...state, loading: true })),
  on(categoriesActions.getCategoriesSuccess, (state, { categories, limit, offset, total }) => ({
    ...state,
    loading: false,
    categories,
    limit,
    offset,
    total,
  })),
  on(categoriesActions.getCategoriesFailure, (state) => ({ ...state, loading: false })),
  on(categoriesActions.searchCategories, (state) => ({ ...state, loading: true })),
  on(categoriesActions.searchCategoriesSuccess, (state, { categories, limit, offset, total }) => ({
    ...state,
    loading: false,
    categories,
    limit,
    offset,
    total,
  })),
  on(categoriesActions.searchCategoriesFailure, (state) => ({ ...state, loading: false })),
  on(categoriesActions.createCategory, (state) => ({ ...state, loading: true })),
  on(categoriesActions.createCategorySuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(categoriesActions.createCategoryFailure, (state) => ({ ...state, loading: false })),
  on(categoriesActions.editCategory, (state) => ({ ...state, loading: true })),
  on(categoriesActions.editCategorySuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(categoriesActions.editCategoryFailure, (state) => ({ ...state, loading: false })),
  on(categoriesActions.deleteCategory, (state) => ({ ...state, loading: true })),
  on(categoriesActions.deleteCategorySuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(categoriesActions.deleteCategoryFailure, (state) => ({ ...state, loading: false })),
  on(categoriesActions.resetSuccessStatus, (state) => ({ ...state, success: false })),
);
