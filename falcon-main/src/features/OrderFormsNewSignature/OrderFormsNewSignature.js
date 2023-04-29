import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MySignaturePad from '../../components/MySignaturePad';
import {colours, font, input} from '../../config';
import {useState} from 'react';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const OrderFormsNewSignature = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const params = route.params;

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [signature, setSignature] = useState(false);

  // format date correctly
  let originalDate = params.dateRequired;
  const originalDateArray = originalDate.split('/');
  const formattedDate =
    originalDateArray[2] +
    '-' +
    originalDateArray[1] +
    '-' +
    originalDateArray[0] +
    'T00:00:00.000Z';

  const handleSubmit = async values => {
    if (signature.length > 10) {
      const res = await sendRequest('/api/order-form-submit', User.token, {
        authoriseName: params.authoriseName,
        siteID: params.siteID,
        orderNumber: params.orderNumber,
        customerEmail: params.customerEmail,
        dateRequired: formattedDate,
        orderNotes: params.orderNotes,
        products: params.products,
        signature: signature,
      });

      Alert.alert(
        'Done',
        'Your order has been received',
        [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
        {cancelable: false},
      );
    } else {
      Alert.alert('Please Sign');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} scrollEnabled={scrollEnabled}>
      <MySignaturePad
        setScrollEnabled={setScrollEnabled}
        signatureHandler={setSignature}
      />

      <View
        style={{
          alignItems: 'center',
          marginBottom: 5,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          style={
            signature ? input.button : [input.button, styles.buttonDisabled]
          }
          onPress={handleSubmit}>
          <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
            Submit Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
});

export default OrderFormsNewSignature;
