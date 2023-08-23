import noop from 'lodash/noop';
import { GenericDialogOptions } from './dialog';
import { createReducer } from './createReducer';

export interface GenericDialogState {
  isGenericDialogVisible: boolean;
  genericDialogContext: {
    dialogComponentJSX: string | JSX.Element;
    genericDialogCallbackHandler: (response: any) => void;
    options: GenericDialogOptions;
  };
}

export const initialState: GenericDialogState = {
  isGenericDialogVisible: false,
  genericDialogContext: {
    dialogComponentJSX: '',
    genericDialogCallbackHandler: noop,
    options: {
      shouldCloseOnOverlayClick: true,
      showCloseIcon: false,
      transparentBody: false,
      modalWidth: '30rem',
      modalPosition: 'top',
    },
  },
};

export type GenericDialogRootState = typeof initialState;

export const actionTypes = {
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
};

export const reducer = createReducer<GenericDialogRootState>(initialState, {
  [actionTypes.SHOW_DIALOG](state, action) {
    state.genericDialogContext = action.dialogContext;
    state.isGenericDialogVisible = true;

    return state;
  },

  [actionTypes.HIDE_DIALOG](state) {
    state.isGenericDialogVisible = false;

    return state;
  },
});
