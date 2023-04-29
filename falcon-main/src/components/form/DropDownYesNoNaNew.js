import * as React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {colours, font, input} from '../../config';

const DropDownYesNoNaNew = () => {
  return (
    <RNPickerSelect
      onValueChange={value => console.log(value)}
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
        {label: 'Yes', value: 'Yes'},
        {label: 'No', value: 'No'},
        {label: 'N/A', value: 'N/A'},
      ]}
    />
  );
};

export default DropDownYesNoNaNew;
