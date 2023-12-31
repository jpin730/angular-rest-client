import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { GetCategories } from 'src/app/types/api-categories-responses';
import { CategoryFormValue } from 'src/app/types/category';

export const categoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Get Categories': props<{ limit?: number; offset?: number }>(),
    'Get All Categories': emptyProps(),
    'Get Categories Success': props<GetCategories>(),
    'Get Categories Failure': emptyProps(),
    'Search Categories': props<{ query: string; limit?: number; offset?: number }>(),
    'Search Categories Success': props<GetCategories>(),
    'Search Categories Failure': emptyProps(),
    'Create Category': props<CategoryFormValue>(),
    'Create Category Success': emptyProps(),
    'Create Category Failure': emptyProps(),
    'Edit Category': props<CategoryFormValue & { id: string }>(),
    'Edit Category Success': emptyProps(),
    'Edit Category Failure': emptyProps(),
    'Delete Category': props<{ id: string }>(),
    'Delete Category Success': emptyProps(),
    'Delete Category Failure': emptyProps(),
    'Reset Success Status': emptyProps(),
  },
});
