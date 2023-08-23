import { GenericDialogOptions } from './dialog';

export interface GenericDialogProps {
  callback?: (cb?: any) => void;
  hideDialog?: () => void;
}

export type AppNotificationsEvent = Event & {
  detail: {
    dialogComponentJSX: string | JSX.Element;
    callbackHandler: (result: any) => any;
    options: GenericDialogOptions;
  };
};