import React from 'react';
import {Portal} from '@gorhom/portal';
import {Modalize} from 'react-native-modalize';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import {colours, font, input} from '../config';


const BottomSheet = (props) => {

  return (
    <Portal>
      <Modalize ref={props.modalRef} modalHeight={props.modalHeight}>
        <View style={styles.content}>
          <Text style={styles.text}>{props.title}</Text>

          <TextInput
                name={props.name}
                style={input.textInputModel}
                multiline={true}
                numberOfLines= {10}
                onChangeText={props.handleChange(props.name)}
                onBlur={props.handleBlur(props.name)}
                value={props.values}
              />

          <Button title="Close" color="#000" onPress={props.onClose} />
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    height: 600,
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#fdc73e',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 48 * 0.02,
    alignSelf: 'center',
    color: '#000',
    fontFamily: font.fontFamily,
    paddingBottom: 10
  },
});

export default BottomSheet;
