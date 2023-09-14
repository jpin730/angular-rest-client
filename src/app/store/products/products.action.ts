import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { GetProducts } from 'src/app/types/api-products-responses';
import { ProductFormValue } from 'src/app/types/product';

export const productsActions = createActionGroup({
  source: 'Products',
  events: {
    'Get Products': props<{ limit?: number; offset?: number }>(),
    'Get Products Success': props<GetProducts>(),
    'Get Products Failure': emptyProps(),
    'Search Products': props<{ query: string; limit?: number; offset?: number }>(),
    'Search Products Success': props<GetProducts>(),
    'Search Products Failure': emptyProps(),
    'Create Product': props<ProductFormValue>(),
    'Create Product Success': emptyProps(),
    'Create Product Failure': emptyProps(),
    'Edit Product': props<ProductFormValue & { id: string }>(),
    'Edit Product Success': emptyProps(),
    'Edit Product Failure': emptyProps(),
    'Delete Product': props<{ id: string }>(),
    'Delete Product Success': emptyProps(),
    'Delete Product Failure': emptyProps(),
    'Reset Success Status': emptyProps(),
  },
});
