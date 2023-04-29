import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import {useNavigation} from '@react-navigation/native';

const endpoint = 'https://app.falconcranes.co.uk';

const useUserStore = create((set, get) => ({
  isLoggedIn: false,
  me: undefined,
  token: undefined,
  error: undefined,
  setUserDetails: async (token, me) => {
    console.log('--- UserStore --- Saving token and me to async storage ...');
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('me', JSON.stringify(me));

      set({isLoggedIn: true, token, me, error: undefined});
    } catch (err) {
      console.log(err);
    }
  },
  logUserOut: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('me');
    RNRestart.Restart();
  },
  login: async (username, password) => {
    const res = await axios.post(`${endpoint}/api/login`, {username, password});

    if (res.data.status == 'error') {
      set({error: 'Login details are incorrect'});
    } else {
      useUserStore.getState().setUserDetails(res.data.token, res.data);
    }
  },

  error: undefined,
}));

export default useUserStore;
