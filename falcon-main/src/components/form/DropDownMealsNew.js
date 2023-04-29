import React, {useRef, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {colours, font, input} from '../../config';

const DropDownMealsNew = ({selectMeals, id, value}) => {
  const ref = useRef();

  return (
    <RNPickerSelect
      onValueChange={value => selectMeals(id, value)}
      placeholder={{
        label: 'Select',
        value: null,
      }}
      style={{
        ...input.dropDown,
        marginLeft: 25,
        marginTop: 40,
        inputAndroid: {
          color: 'grey',
          width: '100%',
          height: 20,
          padding: 0,
          textAlign: 'left',
        },
      }}
      value={value && value.meal ? value.meal : ''}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      items={[
        {label: '0 mins', value: '0'},
        {label: '15 mins', value: '15'},
        {label: '30 mins', value: '30'},
        {label: '45 mins', value: '45'},
        {label: '1 hr', value: '60'},
      ]}
    />
  );
};

export default DropDownMealsNew;
