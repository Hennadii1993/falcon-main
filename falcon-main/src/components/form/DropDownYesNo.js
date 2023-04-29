import React, {useRef, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {colours, font, input} from '../../config';

const DropDownYesNo = ({selectNight, id, value}) => {
  const ref = useRef();

  return (
    <RNPickerSelect
      onValueChange={value => selectNight(id, value)}
      placeholder={{
        label: 'Select',
        value: null,
      }}
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
      value={value && value.night ? value.night : ''}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      items={[
        {label: 'Yes', value: 'Yes'},
        {label: 'No', value: 'No'},
      ]}
    />
  );
};

export default DropDownYesNo;
