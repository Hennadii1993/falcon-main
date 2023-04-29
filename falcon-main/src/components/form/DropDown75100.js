import React, {useRef, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {colours, font, input} from '../../config';

const DropDown7500 = ({setValue75100}) => {
  const ref = useRef();

  return (
    <RNPickerSelect
      onValueChange={value => setValue75100(value)}
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
        {label: '75', value: '75'},
        {label: '100', value: '100'},
      ]}
    />
  );
};

export default DropDown7500;
