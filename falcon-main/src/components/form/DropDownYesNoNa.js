import React, {useRef, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {colours, font, input} from '../../config';
import {View} from 'react-native';

const DropDownYesNoNa = ({setDropdownYesNoNa}) => {
  const ref = useRef();

  return (
    <RNPickerSelect
      onValueChange={value => setDropdownYesNoNa(value)}
      style={{
        ...input.dropDown,
        inputAndroid: {
          color: 'grey',
          width: '100%',
          height: 20,
          padding: 0,
          textAlign: 'left',
        },
      }}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      items={[
        {label: 'Yes', value: 'YES'},
        {label: 'No', value: 'NO'},
        {label: 'N/A', value: 'N/A'},
      ]}
    />
  );
};

export default DropDownYesNoNa;
