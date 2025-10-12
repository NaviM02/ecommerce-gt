import { ConfirmActionService } from '../../services/other/confirm-action.service';

const defaultConfirmData = {
  title: 'txt_confirm',
  bodyQuestion: 'txt_confirm_want_to_proceed',
  bodyText: '',
  buttonType: 'btn-danger text-white fw-semibold',
  confirmText: 'txt_confirm',
  cancelText: 'txt_cancel',
};

/**
 * Decorator to display a confirmation dialog before executing the decorated method.
 * Requires `ConfirmActionService` to be injected in the class constructor to work.
 *
 * @example
 * ```typescript
 * import { ConfirmActionService } from 'path-to-confirm-action.service';
 *
 *  @Component({
 *    // component metadata here
 *  })
 *  export class SomeComponent {
 *    constructor(private confirmActionService: ConfirmActionService) {
 *      // Injection is necessary for the decorator to work
 *    }
 *
 *    @confirmAction({
 *      title: 'txt_are_you_sure',
 *      bodyQuestion: 'txt_confirm_really_want_do_it',
 *      confirmText: 'txt_yes_do_it',
 *      cancelText: 'txt_cancel'
 *    })
 *    someMethod() {
 *      // Method logic here
 *    }
 *  }
 *  ```
 *
 * @param data
 */
export function confirmAction(data: {
  title?: string;
  bodyQuestion?: string;
  bodyText?: string;
  buttonType?: string;
  confirmText?: string;
  cancelText?: string;
}) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const finalData = { ...defaultConfirmData, ...data };

    descriptor.value = async function (...args: any) {
      const confirmActionService = ConfirmActionService.getInstance();
      if (!confirmActionService) {
        console.error('ConfirmActionService not injected properly.');
        return;
      }

      confirmActionService.confirm(finalData)
        .subscribe({
          next: (confirm) => {
            if (confirm) originalMethod.apply(this, args);
          },
          error: _ => {
          }// Ignore dismiss errors
        });
    };

    return descriptor;
  }
}
