import React, {useRef, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {colours, font, input} from '../../config';

const DropDownStanding = ({selectStandingReason, id, value}) => {
  const ref = useRef();

  return (
    <RNPickerSelect
      onValueChange={value => selectStandingReason(id, value)}
      placeholder={{
        label: 'Select',
        value: null,
      }}
      style={{
        ...input.dropDown,
        marginLeft: 25,
        marginTop: 4,
        inputAndroid: {
          color: 'grey',
          width: '100%',
          height: 20,
          padding: 0,
          textAlign: 'left',
        },
      }}
      value={value && value.standingReason ? value.standingReason : ''}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      items={[
        {label: 'Winded off', value: 'Winded off'},
        {label: 'Tower crane service', value: 'Tower crane service'},
        {label: 'Other', value: 'Other'},
      ]}
    />
  );
};

export default DropDownStanding;
