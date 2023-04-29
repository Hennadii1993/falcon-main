import React, {useRef} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {input} from '../../config';

const DropDown = ({setDropDown, items, value}) => {
  const ref = useRef();

  return (
    <RNPickerSelect
      onValueChange={value => setDropDown(value)}
      style={{
        ...input.dropDown,
        inputAndroid: {
          color: 'grey',
          width: '100%',
          height: 20,
          padding: 0,
          textAlign: 'left',
        }
      }}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      value={value}
      items={items}
    />
  );
};

export default DropDown;
