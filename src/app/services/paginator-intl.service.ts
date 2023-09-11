import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorIntlService extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number) =>
    `${page + 1}/${Math.ceil(length / pageSize)}`;
}
