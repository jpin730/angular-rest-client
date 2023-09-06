import { Injectable, inject } from '@angular/core';
import { ActiveToast, IndividualConfig, Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject(ToastrService);
  private baseConfig: Partial<IndividualConfig> = {
    closeButton: true,
    positionClass: 'toast-bottom-center',
    progressBar: true,
    tapToDismiss: false,
  };

  error(message: string): ActiveToast<Toast> {
    return this.toastr.error(message, 'ERROR', {
      ...this.baseConfig,
    });
  }
}
