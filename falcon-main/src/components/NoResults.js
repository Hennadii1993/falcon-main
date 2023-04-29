import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colours, font} from '../config';

const NoResults = props => {
  return (
    <>
      <View>
        <Text style={styles.section}>{props.title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    color: colours.buttonTitle,
    backgroundColor: colours.noResultsPanelBackground,
    fontSize: 16,
    padding: 20,
    margin: 5,
    textAlign: 'center',
    marginLeft: 6,
    fontWeight: '500',
    fontFamily: font.fontFamily,
    textTransform: 'uppercase',
    borderColor: 'black',
    borderWidth: 0.5,
    color: 'black'
  },
});

export default NoResults;
