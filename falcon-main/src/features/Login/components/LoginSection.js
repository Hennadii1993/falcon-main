import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoginButton from './LoginButton';
import {colours, font} from '../../../config';

const LoginSection = props => {
  return (
    <>
      <View style={styles.flex}>
        {props.buttons.map((item, key) => (
          <LoginButton
            title={item.title}
            icon={item.icon}
            colour={item.colour}
            goto={item.goto}
            width={item.width}
            key={key}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fdc73e',
    marginTop: 6,
  },
  section: {
    color: colours.buttonTitle,
    fontSize: 14,
    padding: 4,
    marginLeft: 6,
    fontWeight: '700',
    fontFamily: font.fontFamily,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginTop: 15
  },
});

export default LoginSection;
