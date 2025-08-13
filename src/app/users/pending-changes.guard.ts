import { CanDeactivateFn } from '@angular/router';
import { FormGroup } from '@angular/forms';

export interface FormHostComponent {
  form?: FormGroup;
}

export const pendingChangesGuard: CanDeactivateFn<FormHostComponent> = (component) => {
  const form = component?.form;
  if (form && form.enabled && form.dirty) {
    return confirm('Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istiyor musunuz?');
  }
  return true;
};


