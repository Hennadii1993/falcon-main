import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useEffect} from 'react';
import {useUserStore, useNavigationStore} from '../../store';

const onLogin = () => {
  console.log('--- LoginSideEffects --- Logged in');
};

const onAppLoad = async () => {
  console.log('--- LoginSideEffects --- App loaded');
  const token = await AsyncStorage.getItem('token');
  const me = await AsyncStorage.getItem('me');

  if (token) {
    console.log('--- LoginSideEffects --- We have a token, logging user in...');
    useUserStore.getState().setUserDetails(token, JSON.parse(me));

    useNavigationStore
      .getState()
      .rootNavigatorRef.current?.navigate('Dashboard');
  } else {
    useNavigationStore.getState().rootNavigatorRef.current?.navigate('Login');
  }
};

const LoginSideEffects = ({children}) => {
  const isLoggedIn = useUserStore(state => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      onAppLoad();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      onLogin();
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};

export default LoginSideEffects;
