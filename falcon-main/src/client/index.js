import axios from 'axios';
import {useState, useEffect} from 'react';
import { useUserStore } from '../store';
import { endpoint } from '../config';

// const endpoint = 'https://app.falconcranes.co.uk';

export const useGetRequest = path => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  const User = useUserStore();

  const auth = {
    headers: {
      Authorization: (User.me && User.me.token) ?? false,
      NewApp: 1
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const res = await axios.get(`${endpoint}/${path}`, auth);
      if (res) {
        setData(res.data);
      }
      setStatus('fetched');
    };

    fetchData();
  }, [path]);

  return {status, data};
};

export const usePostRequest = (path, params) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  const User = useUserStore();

  const auth = {
    headers: {
      Authorization: (User.me && User.me.token) ?? false,
      NewApp: 1
    },
  };  

  const sendParams = {...params};

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const res = await axios.post(`${endpoint}/${path}`, sendParams, auth);
      if (res) {
        setData(res.data);
      }
      setStatus('fetched');
    };

    fetchData();
  }, [path]);

  return {status, data};
};

export const sendRequest = async (path, token, params) => {

  const auth = {
    headers: {
      Authorization: token,
      NewApp: 1,
    },
  };

  const res = await axios.post(
    `${endpoint}/${path}`,
    params,
    auth,
  );

  return res.data;

}
