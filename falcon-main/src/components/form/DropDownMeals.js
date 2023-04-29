import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState, useEffect} from 'react';
import {View} from 'react-native';
import {colours, font, input} from '../../config';

const DropDownMeals = () => {
  const [pickeropen, pickersetOpen] = useState(false);
  const [pickervalue, pickersetValue] = useState('');
  const [pickeritems, pickersetItems] = useState([
    {label: '0 mins', value: '0'},
    {label: '15 mins', value: '15'},
    {label: '30 mins', value: '30'},
    {label: '45 mins', value: '45'},
    {label: '1 hr', value: '60'},
  ]);

  return (
    <View>
      <DropDownPicker
        style={input.dropDown}
        // style={{backgroundColor:'white', zIndex:1000, elevation:1000}}
        placeholder=""
        placeholderTextColor={input.placeHolderColor}
        open={pickeropen}
        value={pickervalue}
        items={pickeritems}
        setOpen={pickersetOpen}
        setValue={pickersetValue}
        setItems={pickersetItems}
        listMode="SCROLLVIEW"
      />
    </View>
  );
};


export default DropDownMeals;
