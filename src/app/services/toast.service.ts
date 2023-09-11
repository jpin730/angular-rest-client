import { Injectable, inject } from '@angular/core';
import { ActiveToast, IndividualConfig, Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject(ToastrService);
  private baseConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-bottom-center',
    progressBar: true,
    tapToDismiss: false,
  };

  success(message: string): ActiveToast<Toast> {
    return this.toastr.success(message, 'Success', {
      ...this.baseConfig,
    });
  }

  error(message: string): ActiveToast<Toast> {
    return this.toastr.error(message, 'Error', {
      ...this.baseConfig,
    });
  }
}
