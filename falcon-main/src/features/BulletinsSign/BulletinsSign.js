import * as React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MySignaturePad from '../../components/MySignaturePad';
import {colours, font, input} from '../../config';
import {useState} from 'react';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const BulletinsSign = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);

  const params = route.params;

  const handleSubmit = async values => {

    const requestBody = {
      documentID: params.documentID,
      data: signature,
    };

    const res = await sendRequest(
      '/api/bulletin-sign',
      User.token,
      requestBody,
    );

    Alert.alert(
      'Success',
      'Bulletin signed',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dashboard', {}),
        },
      ],

      {cancelable: false},
    );
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
        <TouchableOpacity style={input.button} onPress={handleSubmit}>
          <Text style={{fontFamily: font.fontFamily, fontWeight: '400', color: 'black'}}>SAVE SIGNATURE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BulletinsSign;
