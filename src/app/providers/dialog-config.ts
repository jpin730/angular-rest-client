import { ValueProvider } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

const globalDialogConfig: MatDialogConfig = {
  autoFocus: false,
  disableClose: true,
};

export const provideDialogConfig = (): ValueProvider => ({
  provide: MAT_DIALOG_DEFAULT_OPTIONS,
  useValue: globalDialogConfig,
});
