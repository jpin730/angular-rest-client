import { createReducer, on } from '@ngrx/store';
import { GetProducts } from 'src/app/types/api-products-responses';
import { productsActions } from './products.action';

export interface ProductsState extends GetProducts {
  loading: boolean;
  success: boolean;
}

export const initialProductsState: ProductsState = {
  total: 0,
  limit: 0,
  offset: 0,
  products: [],
  loading: false,
  success: false,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(productsActions.getProducts, (state) => ({ ...state, loading: true })),
  on(productsActions.getProductsSuccess, (state, { products, limit, offset, total }) => ({
    ...state,
    loading: false,
    products,
    limit,
    offset,
    total,
  })),
  on(productsActions.getProductsFailure, (state) => ({ ...state, loading: false })),
  on(productsActions.searchProducts, (state) => ({ ...state, loading: true })),
  on(productsActions.searchProductsSuccess, (state, { products, limit, offset, total }) => ({
    ...state,
    loading: false,
    products,
    limit,
    offset,
    total,
  })),
  on(productsActions.searchProductsFailure, (state) => ({ ...state, loading: false })),
  on(productsActions.createProduct, (state) => ({ ...state, loading: true })),
  on(productsActions.createProductSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(productsActions.createProductFailure, (state) => ({ ...state, loading: false })),
  on(productsActions.editProduct, (state) => ({ ...state, loading: true })),
  on(productsActions.editProductSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(productsActions.editProductFailure, (state) => ({ ...state, loading: false })),
  on(productsActions.deleteProduct, (state) => ({ ...state, loading: true })),
  on(productsActions.deleteProductSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(productsActions.deleteProductFailure, (state) => ({ ...state, loading: false })),
  on(productsActions.resetSuccessStatus, (state) => ({ ...state, success: false })),
);
