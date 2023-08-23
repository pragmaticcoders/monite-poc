import React, { FC } from 'react';
import { AddCountertpartDialogContainer } from './styles';
import { GenericDialogProps } from 'components/shared/GenericDialog/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Space from 'components/ui-elements/Space';
import Button from 'components/ui-elements/Button';
import Input from 'components/ui-elements/Input';
import CounterPartsService from 'service/counter-parts.service';
import ModalWrapper from 'components/ui-elements/ModalWrapper';

interface AddCountertpartDialogProps extends GenericDialogProps {}

const AddCountertpartDialog: FC<AddCountertpartDialogProps> = ({ hideDialog, callback }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await CounterPartsService.addCounterPart(values.name, values.email);

        callback();
      } catch (e) {
        console.log(e);
      } finally {
        setSubmitting(false);
        hideDialog();
      }
    },
  });
  return (
    <ModalWrapper title="Add Counterpart">
      <AddCountertpartDialogContainer>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Name"
          width="100%"
          error={formik.touched.name && !!formik.errors.name}
        />
        <Space height="1rem" />
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          width="100%"
          error={formik.touched.email && !!formik.errors.email}
        />

        <Space height="1rem" />

        <div className="buttons-container">
          <Button onClick={hideDialog} secondary>
            CANCEL
          </Button>
          <Button onClick={formik.handleSubmit} isLoading={formik.isSubmitting}>
            SAVE
          </Button>
        </div>
      </AddCountertpartDialogContainer>
    </ModalWrapper>
  );
};

export default AddCountertpartDialog;
