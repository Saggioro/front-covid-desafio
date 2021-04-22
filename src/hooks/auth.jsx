import React, { useContext, createContext, useState } from 'react';
import jwt from 'jsonwebtoken';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Agendacovid:token');

    if (token) {
      const decoded = jwt.decode(token);

      const today = new Date();
      const expToken = new Date(decoded.exp * 1000);

      if (today > expToken) {
        localStorage.removeItem('@Agendacovid:token');
        api.defaults.headers.authorization = '';

        return {};
      }
      const { birth } = decoded;

      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, birth };
    }

    return {};
  });

  const signIn = async ({ cpf, password }) => {
    const response = await api.post('/sessionsUser', { cpf, password });

    const { birth } = jwt.decode(response.data.token);

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;
    localStorage.setItem('@Agendacovid:token', response.data.token);

    setData({ token: response.data.token, birth });
  };

  const signOut = () => {
    api.defaults.headers.authorization = '';
    localStorage.removeItem('@Agendacovid:token');

    setData({});
  };

  return (
    <>
      {data.token ? (
        <AuthContext.Provider value={{ birth: data.birth, signIn, signOut }}>
          {children}
        </AuthContext.Provider>
      ) : (
        <AuthContext.Provider value={{ birth: '', signIn, signOut }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
