import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Page from '../../components/Page';
import SignIn from '../../components/SignIn';
import { useAuth } from '../../hooks/auth';

const UserLogin = () => {
  const { signIn } = useAuth();

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      cpf: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        await signIn(values);

        history.push('/userAppointment');
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    },
  });

  return (
    <Page title="Login">
      <SignIn
        onSubmit={formik.handleSubmit}
        cpf={formik.values.cpf}
        password={formik.values.password}
        handleChange={formik.handleChange}
      />
    </Page>
  );
};
export default UserLogin;
