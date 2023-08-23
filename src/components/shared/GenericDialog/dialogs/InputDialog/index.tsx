import React, { FC } from 'react';
import { InputDialogContainer } from './styles';
import { useFormik } from 'formik';
import noop from 'lodash/noop';
import { GenericDialogProps } from 'components/shared/GenericDialog/types';
import Space from 'components/ui-elements/Space';
import Button from 'components/ui-elements/Button';

interface InputDialogProps {
  title: string;
  message: string;
  initialValue?: string;
  inputPlaceholder?: string;
  approveButtonLabel?: string;
  cancelButtonLabel?: string;
}

const InputDialog: FC<InputDialogProps & GenericDialogProps> = ({
  title,
  message,
  initialValue,
  inputPlaceholder,
  approveButtonLabel,
  cancelButtonLabel,
  hideDialog,
  callback,
}) => {
  const formik = useFormik({
    initialValues: {
      inputValue: initialValue || '',
    },
    onSubmit: noop,
  });

  return (
    <InputDialogContainer className="input-dialog">
      <div className="heading">{title}</div>

      <div className="body">
        <div className="message-holder">{message}</div>

        <div className="dialog-message">{message}</div>

        <Space height="1.5rem" />

        {/*<Input
        name="inputValue"
        placeholder={inputPlaceholder}
        width="100%"
        value={formik.values.inputValue}
        onChange={formik.handleChange}
        autoFocus
        onEnter={() => callback(formik.values.inputValue)}
      />*/}

        <input
          className="input"
          name="inputValue"
          placeholder={inputPlaceholder}
          width="100%"
          value={formik.values.inputValue}
          onChange={formik.handleChange}
          autoFocus
        />

        <Space height="1.5rem" />

        <div className="buttons-holder">
          <Button secondary onClick={hideDialog}>
            {cancelButtonLabel}
          </Button>
          <Button onClick={() => callback(formik.values.inputValue)}>{approveButtonLabel}</Button>
        </div>
      </div>
    </InputDialogContainer>
  );
};

InputDialog.defaultProps = {
  title: 'Input',
  message: 'enter data',
  cancelButtonLabel: 'Cancel',
  approveButtonLabel: 'Ok',
};

export default InputDialog;
