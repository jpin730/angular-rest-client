import { ClassProvider } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { PaginatorIntlService } from '../services/paginator-intl.service';

export const providePaginatorIntl = (): ClassProvider => ({
  provide: MatPaginatorIntl,
  useClass: PaginatorIntlService,
});
