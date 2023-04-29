import * as React from 'react';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Alert} from 'react-native';
import {colours, font} from '../../../config';
import {useUserStore} from '../../../store';
import {sendRequest} from '../../../client';

const LoginButton = props => {
  const navigation = useNavigation();

  const containerStyle = {
    height: 100,
    width: props.width ?? '30%',
    margin: 4,
  };

  const titleStyle = {
    color: '#7f7f7f',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '400',
    fontFamily: font.fontFamily,
  };

  const buttonStyle = {
    borderColor: '#c0c0c0',
    backgroundColor: '#fff',
    height: '100%',
    flexDirection: 'column',
  };

  return (
    <>
      <View style={containerStyle}>
        <Button
          icon={{
            name: props.icon,
            type: 'feather',
            size: 50,
            color: props.colour,
          }}
          title={props.title}
          type="outline"
          raised
          buttonStyle={buttonStyle}
          titleStyle={titleStyle}
          containerStyle={{width: '100%'}}
          onPress={() => navigation.navigate(props.goto)}
        />
      </View>
    </>
  );
};

export default LoginButton;
