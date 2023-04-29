import * as React from 'react';
import DashboardCustomer from './DashboardCustomer';
import DashboardEmployee from './DashboardEmployee';
import {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {useUserStore} from '../../store';
import {usePostRequest, sendRequest} from '../../client';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const Dashboard = () => {
  
  const User = useUserStore();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [firebaseToken, setFirebaseToken] = useState('');

  async function onAppBootstrap() {
    const settings = await notifee.requestPermission();
  
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      // Get the token
      try {
        const token = await messaging().getToken();
        console.log('token', token)
        setFirebaseToken(token)
      } catch (err) {
        console.log('getToken', err);
      }
    } else {
      console.log('User declined permissions');
    }
  } 
  
  useEffect(() => {
    onAppBootstrap();
  }, []);

  useEffect(() => {
    sendRequest(
      '/api/me',
      User.token,
      { pushNotification: firebaseToken},
    );
  }, [firebaseToken]);    

  if(isFocused) {
    notifee.setBadgeCount(0)
  }

  // get this from /login
  const {status, data} = usePostRequest('/api/me', {version: '5.0.0-a'});

  useEffect(() => {}, [data]);

  if (status === 'fetched') {
    if (data.passwordResetRequired === true) {
      navigation.navigate('PasswordReset', {});
    }
  }

  const userProps = {
    seeSnapshots: User.me.seeSnapshots ?? 0,
    seePolicies: User.me.seePolicies ?? 0,
    hasPersonnel: User.me.hasPersonnel ?? 0,
    hasBulletins: User.me.hasBulletins ?? 1,
    isSupervisor: User.me.isSupervisor ?? 0,
    seeYard: User.me.seeYard ?? 0,
    seeOrderForm: User.me.seeOrderForm ?? 0,
    customerProductBatch: User.me.customerProductBatch ?? 0,
  };

  const customerID = User.me.customerID ?? 0;

  return (
    <>
      <ScrollView style={{flex: 1, padding: 5}}>
        {customerID > 0 ? <DashboardCustomer userProps={userProps} /> : null}
        {customerID == 0 && data.userAppSections ? (
          <DashboardEmployee Props={data.userAppSections} />
        ) : null}
      </ScrollView>
    </>
  );
};

export default Dashboard;
