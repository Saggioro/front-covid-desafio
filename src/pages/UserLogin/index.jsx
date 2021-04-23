import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Page from '../../components/Page';
import SignIn from '../../components/SignIn';
import { useAuth } from '../../hooks/auth';

const UserLogin = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const validate = values => {
    const errors = {};

    if (!values.cpf) {
      errors.cpf = 'Obrigatório*';
    } else if (values.cpf.length !== 11) {
      errors.cpf = 'Precisa ter 11 caracteres';
    }
    if (!values.password) {
      errors.password = 'Obrigatório*';
    } else if (values.password.length < 3) {
      errors.password = 'Precisa ter pelo menos 3 caracteres';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      cpf: '',
      password: '',
    },
    validate,
    onSubmit: async values => {
      setLoading(true);
      try {
        await signIn(values);

        history.push('/userDashboard');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Parece que temos um problema em nossos servidores :(',
        );
      }
      setLoading(false);
    },
  });

  return (
    <Page title="Login">
      <SignIn
        onSubmit={formik.handleSubmit}
        cpf={formik.values.cpf}
        password={formik.values.password}
        handleChange={formik.handleChange}
        errors={formik.errors}
        isLoading={loading}
      />
      <p className="mt-1 mb-0">ou</p>
      <Link to="/userSignUp">Cadastre-se</Link>
    </Page>
  );
};
export default UserLogin;
