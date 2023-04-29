import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {usePostRequest} from '../../client';
import {useState, useEffect} from 'react';
import {colours, font, input} from '../../config';

const MyDropDown = ({setSiteID}) => {
  const [pickeropen, pickersetOpen] = useState(false);
  const [pickervalue, pickersetValue] = useState(null);
  const [pickeritems, pickersetItems] = useState([]);

  const {status: siteStatus, data: siteData} = usePostRequest('/api/sites', {});

  useEffect(() => {
    if (siteData.count) {
      const sitesList = [];
      siteData.results.map((item, key) =>
        sitesList.push({label: item.siteName, value: item.siteID})
      );
      pickersetItems(sitesList);
    }
  }, [siteData]);

  useEffect(() =>  {
    setSiteID('siteID', pickervalue);
  }, [pickervalue])

  return (
    <DropDownPicker
      style={input.orderFormDropDown}
      placeholder="Please chose a site"
      placeholderTextColor={input.placeHolderColor}
      open={pickeropen}
      value={pickervalue}
      items={pickeritems}
      setOpen={pickersetOpen}
      setValue={pickersetValue}
      setItems={pickersetItems}
      listMode="SCROLLVIEW"
    />
  );
};

export default MyDropDown;
