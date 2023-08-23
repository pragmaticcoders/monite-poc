import React, { FC } from 'react';
import { FormDialogContainer } from './styles';
import { GenericDialogProps } from 'components/shared/GenericDialog/types';
import ModalWrapper from 'components/ui-elements/ModalWrapper';
import { useFormik } from 'formik';
import { reduce } from 'lodash';
import Input from 'components/ui-elements/Input';
import Button from 'components/ui-elements/Button';
import humanizeString from 'humanize-string';

interface InputDialogProps extends GenericDialogProps {
  title: string;
  schema: Array<{
    name: string;
    placeholder?: string;
  }>;
  onSubmit: (data: any, setSubmitting: (isSubmitting: boolean) => void) => Promise<void>;
}

const FormDialog: FC<InputDialogProps> = ({ onSubmit, schema, hideDialog, title, callback }) => {
  const formik = useFormik({
    initialValues: reduce(
      schema,
      (acc, schemaItem) => {
        acc[schemaItem.name] = '';
        return acc;
      },
      {} as Record<string, string>
    ),
    onSubmit: async (values, { setSubmitting }) => {
      await onSubmit(values, setSubmitting);
      callback();
    },
  });

  return (
    <ModalWrapper title={title}>
      <FormDialogContainer>
        <div className="form-holder">
          {schema.map(schema => (
            <div className="input-item">
              <Input
                type="text"
                value={formik.values[schema.name]}
                name={schema.name}
                onChange={formik.handleChange}
                placeholder={schema.placeholder ?? humanizeString(schema.name)}
              />
            </div>
          ))}
        </div>

        <div className="button-wrapper">
          <Button onClick={hideDialog} secondary>
            CANCEL
          </Button>

          <Button onClick={formik.handleSubmit} isLoading={formik.isSubmitting}>
            SAVE
          </Button>
        </div>
      </FormDialogContainer>
    </ModalWrapper>
  );
};

export default FormDialog;
