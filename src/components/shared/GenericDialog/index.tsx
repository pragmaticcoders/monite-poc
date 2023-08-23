import { GenericDialogOptions } from "./dialog";
import { AppNotificationEvent } from "./events";
import { actionTypes, initialState, reducer } from "./state";
import { AppNotificationsEvent } from "./types";
import React, { cloneElement, FC, useCallback, useEffect, useReducer } from "react";
import noop from "lodash/noop";
import Modal from "components/shared/GenericDialog/Modal";

/**
 * GenericDialog component is a component that can be used to show any dialog
 * and handle awaiting for user input.
 *
 * usage:
 * const response = await dialog.genericDialog(<MyCustomDialogComponent />);
 *
 * MyCustomDialogComponent should be a component that renders modal. I receives 'callback'
 * and 'hideDialog' props. Eg when user clicks on 'confirm' button, you should call callback() and
 * pass whatever you want to return from the dialog. When user clicks on 'cancel' button, you should
 * call hideDialog(); When callback() is called, the dialog will be closed automatically and
 * dialog.genericDialog() will be resolved with argument passed to callback().
 *
 */

const GenericDialog: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onGenericDialogRequest = (event: AppNotificationsEvent) => {
    const dialogOptions: GenericDialogOptions = {
      shouldCloseOnOverlayClick: true,
      ...event.detail.options,
    };

    dispatch({
      type: actionTypes.SHOW_DIALOG,
      dialogContext: {
        dialogComponentJSX: event.detail.dialogComponentJSX,
        genericDialogCallbackHandler: event.detail.callbackHandler,
        options: dialogOptions,
      },
    });
  };

  const hideGenericDialog = () => dispatch({ type: actionTypes.HIDE_DIALOG });

  const onESCClick = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideGenericDialog();
    }
  }, []);

  useEffect(() => {
    window.addEventListener(AppNotificationEvent.GENERIC_DIALOG_REQUEST, onGenericDialogRequest);
    window.addEventListener(AppNotificationEvent.HIDE_CURRENT_OPENED_DIALOG, hideGenericDialog);
    document.addEventListener('keydown', onESCClick, false);

    return () => {
      window.removeEventListener(
        AppNotificationEvent.GENERIC_DIALOG_REQUEST,
        onGenericDialogRequest
      );
    };
  }, []);

  if (state.isGenericDialogVisible) {
    const { shouldCloseOnOverlayClick, transparentBody, modalWidth, showCloseIcon } =
      state.genericDialogContext.options;
    const _onRequestClose = shouldCloseOnOverlayClick ? hideGenericDialog : noop;

    return (
      <Modal
        isOpen={state.isGenericDialogVisible}
        className="generic-dialog-modal"
        onRequestClose={_onRequestClose}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        transparentBody={transparentBody}
        modalWidth={modalWidth}
        showCloseIcon={showCloseIcon}
      >
        {cloneElement(state.genericDialogContext.dialogComponentJSX as JSX.Element, {
          callback: (response: any) => {
            hideGenericDialog();
            state.genericDialogContext.genericDialogCallbackHandler(response);
          },
          hideDialog: hideGenericDialog,
        })}
      </Modal>
    );
  }

  return null;
};

export default GenericDialog;
