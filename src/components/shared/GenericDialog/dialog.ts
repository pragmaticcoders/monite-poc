import { AppNotificationEvent } from './events';
import { getComponentJSX } from './utils';
import ConfirmDialog from './dialogs/ConfirmDialog';
import InputDialog from 'components/shared/GenericDialog/dialogs/InputDialog';

export interface GenericDialogOptions {
  shouldCloseOnOverlayClick?: boolean;
  transparentBody?: boolean;
  modalWidth?: string;
  showCloseIcon?: boolean;
  modalPosition?: 'top' | 'center';
}

export interface ConfirmDialogOptions {
  title: string;
  message?: string | JSX.Element;
  type?: string;
}

export interface InputDialogOptions {
  title: string;
  initialValue?: string;
  inputPlaceholder?: string;
  approveButtonLabel?: string;
  cancelButtonLabel?: string;
}

export const dialog = {
  genericDialog: (dialogComponentJSX: JSX.Element, options: GenericDialogOptions = {}) => {
    return new Promise(resolve => {
      window.dispatchEvent(
        new CustomEvent(AppNotificationEvent.GENERIC_DIALOG_REQUEST, {
          detail: {
            dialogComponentJSX,
            callbackHandler: (result: any) => resolve(result),
            options,
          },
        })
      );
    });
  },

  confirm: ({ title, message, type }: ConfirmDialogOptions) => {
    return new Promise(resolve => {
      window.dispatchEvent(
        new CustomEvent(AppNotificationEvent.GENERIC_DIALOG_REQUEST, {
          detail: {
            dialogComponentJSX: getComponentJSX(ConfirmDialog, { title, message, type }),
            callbackHandler: (result: any) => resolve(result),
          },
        })
      );
    });
  },

  input: ({
    title,
    initialValue,
    inputPlaceholder,
    approveButtonLabel,
    cancelButtonLabel,
  }: InputDialogOptions) => {
    return new Promise(resolve => {
      window.dispatchEvent(
        new CustomEvent(AppNotificationEvent.GENERIC_DIALOG_REQUEST, {
          detail: {
            dialogComponentJSX: getComponentJSX(InputDialog, {
              title,
              initialValue,
              inputPlaceholder,
              approveButtonLabel,
              cancelButtonLabel,
            }),
            callbackHandler: (result: any) => resolve(result),
          },
        })
      );
    });
  },

  hideCurrentOpenedDialog: () => {
    window.dispatchEvent(new CustomEvent(AppNotificationEvent.HIDE_CURRENT_OPENED_DIALOG));
  }
};
