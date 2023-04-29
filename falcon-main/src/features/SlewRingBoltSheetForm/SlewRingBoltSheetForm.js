import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef, useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {formatTime} from '../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ManageImages from '../../components/ManageImages';
import MySignaturePad from '../../components/MySignaturePad';
import SwitchToggle from 'react-native-switch-toggle';
import {formatDay} from '../../utilities';
import DatePicker from 'react-native-date-picker';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const SlewRingBoltSheetForm = ({route}) => {
  const navigation = useNavigation();

  // crane from previous form
  const linkID = route.params.linkID;

  const User = useUserStore();

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  const [submitting, setSubmitting] = useState(false);

  const [boltsReplacedSwitchOn, setBoltsReplacedSwitchOn] = useState(false);
  const [fullSetSwitchOn, setFullSetSwitchOn] = useState(false);

  const [outerBoltsReplacedSwitchOn, setOuterBoltsReplacedSwitchOn] =
    useState(false);
  const [outerFullSetSwitchOn, setOuterFullSetSwitchOn] = useState(false);

  const [innerRing, setInnerRing] = useState(true);
  const [outerRing, setOuterRing] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);

  // fitter date
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = formatDay(date);

  // inner_calibration_torque_date (calibration certificate expiry date)
  const [innerICDate, setInnerICDate] = useState(new Date());
  const [ICopen, setICOpen] = useState(false);
  const formattedICDate = formatDay(innerICDate);

  const innerICDateArray = formattedICDate.split('/');
  const innerICDateAPI =
    innerICDateArray[2] + '-' + innerICDateArray[1] + '-' + innerICDateArray[0];

  // outer_calibration_torque_date (calibration certificate expiry date)
  const [outerOCDate, setOuterOCDate] = useState(new Date());
  const [OCopen, setOCOpen] = useState(false);
  const formattedOCDate = formatDay(outerOCDate);

  const outerOCDateArray = formattedOCDate.split('/');
  const outerOCDateAPI =
    outerOCDateArray[2] + '-' + outerOCDateArray[1] + '-' + outerOCDateArray[0];

  // inner_calibration_multiplier_date (calibration multiplier date)
  const [IMDate, setIMDate] = useState(new Date());
  const [IMopen, setIMOpen] = useState(false);
  const formattedIMDate = formatDay(IMDate);

  const IMDateArray = formattedIMDate.split('/');
  const IMDateAPI =
    IMDateArray[2] + '-' + IMDateArray[1] + '-' + IMDateArray[0];

  // outer_calibration_multiplier_date (calibration multiplier date)
  const [OMDate, setOMDate] = useState(new Date());
  const [OMopen, setOMOpen] = useState(false);
  const formattedOMDate = formatDay(OMDate);

  const OMDateArray = formattedOMDate.split('/');
  const OMDateAPI =
    OMDateArray[2] + '-' + OMDateArray[1] + '-' + OMDateArray[0];

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);

  const handleSubmit = async values => {
    setSubmitting(true);

    const builderData = JSON.stringify({
      inner_bolts_replaced: boltsReplacedSwitchOn,
      inner_quantity_bolts_replaced: values.inner_quantity_bolts_replaced,
      inner_quantity_nuts_replaced: values.inner_quantity_nuts_replaced,
      inner_quantity_washers_replaced: values.inner_quantity_washers_replaced,
      inner_bolt_diameter: values.inner_bolt_diameter,
      inner_bolt_length: values.inner_bolt_length,
      inner_bolt_grade: values.inner_bolt_grade,
      inner_full_set: fullSetSwitchOn,
      inner_bolt_type: values.inner_bolt_type,
      inner_nut_type: values.inner_nut_type,
      inner_purchased_from: values.inner_purchased_from,
      inner_batch_number: values.inner_batch_number,
      inner_order_number: values.inner_order_number,
      inner_torque_wrench_number: values.inner_torque_wrench_number,
      inner_calibration_torque_date: innerICDateAPI,
      inner_multiplier: values.inner_multiplier,
      inner_calibration_multiplier_date: IMDateAPI,
      inner_tightening: values.inner_tightening,
      inner_comments: values.inner_comments,
      outer_bolts_replaced: outerBoltsReplacedSwitchOn,
      outer_quantity_bolts_replaced: values.outer_quantity_bolts_replaced,
      outer_quantity_nuts_replaced: values.outer_quantity_nuts_replaced,
      outer_quantity_washers_replaced: values.outer_quantity_washers_replaced,
      outer_bolt_diameter: values.outer_bolt_diameter,
      outer_bolt_length: values.outer_bolt_length,
      outer_bolt_grade: values.outer_bolt_grade,
      outer_full_set: outerFullSetSwitchOn,
      outer_bolt_type: values.outer_bolt_type,
      outer_nut_type: values.outer_nut_type,
      outer_purchased_from: values.outer_purchased_from,
      outer_batch_number: values.outer_batch_number,
      outer_order_number: values.outer_order_number,
      outer_torque_wrench_number: values.outer_torque_wrench_number,
      outer_calibration_torque_date: outerOCDateAPI,
      outer_multiplier: values.outer_multiplier,
      outer_calibration_multiplier_date: OMDateAPI,
      outer_tightening: values.outer_tightening,
      outer_comments: values.outer_comments,
      fitters_name: values.fitters_name,
      fitters_date: formattedDate,
    });

    const requestBody = {
      linkID: linkID,
      formType: 'slew_ring',
      builderData,
      signature,
      selectedPhotos: imagesArray,
    };

    if (signature.length > 0) {
      const res = await sendRequest(
        '/api/formbuilder-submit',
        User.token,
        requestBody,
      );

      Alert.alert(
        'Submitted',
        'Your form submission has been made',
        [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
        {cancelable: false},
      );
    } else {
      Alert.alert('Please Sign');
    }
  };

  const loginValidationSchema = yup.object().shape({});

  return (
    <KeyboardAwareScrollView scrollEnabled={scrollEnabled}>
      <View style={styles.mainContainer}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            reportedFault: '',
            workCarriedOut: '',
            furtherWorkRequired: '',
            partsUsed: '',
            timeOnSite: '',
            timeOn: '9',
            timeOff: '10',
          }}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isValid,
            setFieldValue,
          }) => (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <TouchableOpacity
                  style={
                    innerRing
                      ? input.button
                      : [input.button, styles.buttonDisabled]
                  }
                  onPress={() => {
                    setInnerRing(!innerRing);
                    setOuterRing(!outerRing);
                  }}
                  disabled={!isValid}>
                  <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                    Inner Ring Bolts
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    outerRing
                      ? input.button
                      : [input.button, styles.buttonDisabled]
                  }
                  onPress={() => {
                    setInnerRing(!innerRing);
                    setOuterRing(!outerRing);
                  }}
                  disabled={!isValid}>
                  <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                    Outer Ring Bolts
                  </Text>
                </TouchableOpacity>
              </View>

              {innerRing ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 25,
                    }}>
                    <Text style={styles.label}>Bolts replaced</Text>
                    <SwitchToggle
                      switchOn={boltsReplacedSwitchOn}
                      backgroundColorOn={'#fdc73e'}
                      onPress={() => {
                        setBoltsReplacedSwitchOn(!boltsReplacedSwitchOn);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Quantity of bolts replaced</Text>
                    <TextInput
                      name="inner_quantity_bolts_replaced"
                      style={input.textInputMedium}
                      onChangeText={handleChange(
                        'inner_quantity_bolts_replaced',
                      )}
                      onBlur={handleBlur('inner_quantity_bolts_replaced')}
                      value={values.inner_quantity_bolts_replaced}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Quantity of nuts replaced</Text>
                    <TextInput
                      name="inner_quantity_nuts_replaced"
                      style={input.textInputMedium}
                      onChangeText={handleChange(
                        'inner_quantity_nuts_replaced',
                      )}
                      onBlur={handleBlur('inner_quantity_nuts_replaced')}
                      value={values.inner_quantity_nuts_replaced}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>
                      Quantity of washers replaced
                    </Text>
                    <TextInput
                      name="inner_quantity_washers_replaced"
                      style={input.textInputMedium}
                      onChangeText={handleChange(
                        'inner_quantity_washers_replaced',
                      )}
                      onBlur={handleBlur('inner_quantity_washers_replaced')}
                      value={values.inner_quantity_washers_replaced}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Bolt Diameter</Text>
                    <TextInput
                      name="inner_bolt_diameter"
                      style={input.textInputMedium}
                      onChangeText={handleChange('inner_bolt_diameter')}
                      onBlur={handleBlur('inner_bolt_diameter')}
                      value={values.inner_bolt_diameter}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Bolt Length</Text>
                    <TextInput
                      name="inner_bolt_length"
                      style={input.textInputMedium}
                      onChangeText={handleChange('inner_bolt_length')}
                      onBlur={handleBlur('inner_bolt_length')}
                      value={values.inner_bolt_length}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Bolt Grade</Text>
                    <TextInput
                      name="inner_bolt_grade"
                      style={input.textInputMedium}
                      onChangeText={handleChange('inner_bolt_grade')}
                      onBlur={handleBlur('inner_bolt_grade')}
                      value={values.inner_bolt_grade}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 25,
                      paddingBottom: 10,
                    }}>
                    <Text style={styles.label}>Full set</Text>
                    <SwitchToggle
                      switchOn={fullSetSwitchOn}
                      backgroundColorOn={'#fdc73e'}
                      onPress={() => {
                        setFullSetSwitchOn(!fullSetSwitchOn);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 2,
                    }}>
                    <Text style={styles.label}>Bolt Type</Text>
                    <TextInput
                      name="inner_bolt_type"
                      style={input.textInput}
                      placeholder={'Galvanised, black etc'}
                      onChangeText={handleChange('inner_bolt_type')}
                      onBlur={handleBlur('inner_bolt_type')}
                      value={values.inner_bolt_type}
                    />
                    <Text style={styles.label}>Nut Type</Text>
                    <TextInput
                      name="inner_nut_type"
                      style={input.textInput}
                      placeholder={'Auto lube, galvanised etc'}
                      onChangeText={handleChange('inner_nut_type')}
                      onBlur={handleBlur('inner_nut_type')}
                      value={values.inner_nut_type}
                    />
                    <Text style={styles.label}>Purchased From</Text>
                    <TextInput
                      name="inner_purchased_from"
                      style={input.textInput}
                      onChangeText={handleChange('inner_purchased_from')}
                      onBlur={handleBlur('inner_purchased_from')}
                      value={values.inner_purchased_from}
                    />
                    <Text style={styles.label}>Batch Number</Text>
                    <TextInput
                      name="inner_batch_number"
                      style={input.textInput}
                      onChangeText={handleChange('inner_batch_number')}
                      onBlur={handleBlur('inner_batch_number')}
                      value={values.inner_batch_number}
                    />
                    <Text style={styles.label}>Order Number</Text>
                    <TextInput
                      name="inner_order_number"
                      style={input.textInput}
                      onChangeText={handleChange('inner_order_number')}
                      onBlur={handleBlur('inner_order_number')}
                      value={values.inner_order_number}
                    />
                    <Text style={styles.label}>Torque Wrench Number</Text>
                    <TextInput
                      name="inner_torque_wrench_number"
                      style={input.textInput}
                      onChangeText={handleChange('inner_torque_wrench_number')}
                      onBlur={handleBlur('inner_torque_wrench_number')}
                      value={values.inner_torque_wrench_number}
                    />
                    <Text style={styles.label}>
                      Calibration Certificate Expiry Date
                    </Text>

                    <TextInput
                      name="inner_calibration_torque_date"
                      style={input.textInput}
                      value={formattedICDate}
                      onFocus={() => setICOpen(true)}
                    />
                    <DatePicker
                      modal
                      minimumDate={d}
                      mode="date"
                      open={ICopen}
                      date={innerICDate}
                      onConfirm={date => {
                        setICOpen(false);
                        setInnerICDate(date);
                      }}
                      onCancel={() => {
                        setICOpen(false);
                      }}
                    />

                    <Text style={styles.label}>Multiplier/Pump unit</Text>
                    <TextInput
                      name="inner_multiplier"
                      style={input.textInput}
                      onChangeText={handleChange('inner_multiplier')}
                      onBlur={handleBlur('inner_multiplier')}
                      value={values.inner_multiplier}
                    />

                    <Text style={styles.label}>
                      Calibration Multiplier Date
                    </Text>
                    <TextInput
                      name="inner_calibration_multiplier_date"
                      style={input.textInput}
                      value={formattedIMDate}
                      onFocus={() => setIMOpen(true)}
                    />
                    <DatePicker
                      modal
                      minimumDate={d}
                      mode="date"
                      open={IMopen}
                      date={IMDate}
                      onConfirm={date => {
                        setIMOpen(false);
                        setIMDate(date);
                      }}
                      onCancel={() => {
                        setIMOpen(false);
                      }}
                    />

                    <Text style={styles.label}>Tightening Torque Applied</Text>
                    <TextInput
                      name="inner_tightening"
                      style={input.textInput}
                      onChangeText={handleChange('inner_tightening')}
                      onBlur={handleBlur('inner_tightening')}
                      value={values.inner_tightening}
                    />
                    <Text style={styles.label}>Comments</Text>
                    <TextInput
                      name="inner_comments"
                      style={input.textInput}
                      onChangeText={handleChange('inner_comments')}
                      onBlur={handleBlur('inner_comments')}
                      value={values.inner_comments}
                    />
                  </View>
                </View>
              ) : (
                ''
              )}

              {outerRing ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 25,
                    }}>
                    <Text style={styles.label}>Bolts replaced</Text>
                    <SwitchToggle
                      switchOn={outerBoltsReplacedSwitchOn}
                      backgroundColorOn={'#fdc73e'}
                      onPress={() => {
                        setOuterBoltsReplacedSwitchOn(
                          !outerBoltsReplacedSwitchOn,
                        );
                      }}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Quantity of bolts replaced</Text>
                    <TextInput
                      name="outer_quantity_bolts_replaced"
                      style={input.textInputMedium}
                      onChangeText={handleChange(
                        'outer_quantity_bolts_replaced',
                      )}
                      onBlur={handleBlur('outer_quantity_bolts_replaced')}
                      value={values.outer_quantity_bolts_replaced}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Quantity of nuts replaced</Text>
                    <TextInput
                      name="outer_quantity_nuts_replaced"
                      style={input.textInputMedium}
                      onChangeText={handleChange(
                        'outer_quantity_nuts_replaced',
                      )}
                      onBlur={handleBlur('outer_quantity_nuts_replaced')}
                      value={values.outer_quantity_nuts_replaced}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>
                      Quantity of washers replaced
                    </Text>
                    <TextInput
                      name="outer_quantity_washers_replaced"
                      style={input.textInputMedium}
                      onChangeText={handleChange(
                        'outer_quantity_washers_replaced',
                      )}
                      onBlur={handleBlur('outer_quantity_washers_replaced')}
                      value={values.outer_quantity_washers_replaced}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Bolt Diameter</Text>
                    <TextInput
                      name="outer_bolt_diameter"
                      style={input.textInputMedium}
                      onChangeText={handleChange('outer_bolt_diameter')}
                      onBlur={handleBlur('outer_bolt_diameter')}
                      value={values.outer_bolt_diameter}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Bolt Length</Text>
                    <TextInput
                      name="outer_bolt_length"
                      style={input.textInputMedium}
                      onChangeText={handleChange('outer_bolt_length')}
                      onBlur={handleBlur('outer_bolt_length')}
                      value={values.outer_bolt_length}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <Text style={styles.label}>Bolt Grade</Text>
                    <TextInput
                      name="outer_bolt_grade"
                      style={input.textInputMedium}
                      onChangeText={handleChange('outer_bolt_grade')}
                      onBlur={handleBlur('outer_bolt_grade')}
                      value={values.outer_bolt_grade}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 25,
                      paddingBottom: 10,
                    }}>
                    <Text style={styles.label}>Full set</Text>
                    <SwitchToggle
                      switchOn={outerFullSetSwitchOn}
                      backgroundColorOn={'#fdc73e'}
                      onPress={() => {
                        setOuterFullSetSwitchOn(!outerFullSetSwitchOn);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 2,
                    }}>
                    <Text style={styles.label}>Bolt Type</Text>
                    <TextInput
                      name="outer_bolt_type"
                      style={input.textInput}
                      placeholder={'Galvanised, black etc'}
                      onChangeText={handleChange('outer_bolt_type')}
                      onBlur={handleBlur('outer_bolt_type')}
                      value={values.outer_bolt_type}
                    />
                    <Text style={styles.label}>Nut Type</Text>
                    <TextInput
                      name="outer_nut_type"
                      style={input.textInput}
                      placeholder={'Auto lube, galvanised etc'}
                      onChangeText={handleChange('outer_nut_type')}
                      onBlur={handleBlur('outer_nut_type')}
                      value={values.outer_nut_type}
                    />
                    <Text style={styles.label}>Purchased From</Text>
                    <TextInput
                      name="outer_purchased_from"
                      style={input.textInput}
                      onChangeText={handleChange('outer_purchased_from')}
                      onBlur={handleBlur('outer_purchased_from')}
                      value={values.outer_purchased_from}
                    />
                    <Text style={styles.label}>Batch Number</Text>
                    <TextInput
                      name="outer_batch_number"
                      style={input.textInput}
                      onChangeText={handleChange('outer_batch_number')}
                      onBlur={handleBlur('outer_batch_number')}
                      value={values.outer_batch_number}
                    />
                    <Text style={styles.label}>Order Number</Text>
                    <TextInput
                      name="outer_order_number"
                      style={input.textInput}
                      onChangeText={handleChange('outer_order_number')}
                      onBlur={handleBlur('outer_order_number')}
                      value={values.outer_order_number}
                    />
                    <Text style={styles.label}>Torque Wrench Number</Text>
                    <TextInput
                      name="outer_torque_wrench_number"
                      style={input.textInput}
                      onChangeText={handleChange('outer_torque_wrench_number')}
                      onBlur={handleBlur('outer_torque_wrench_number')}
                      value={values.outer_torque_wrench_number}
                    />
                    <Text style={styles.label}>
                      Calibration Certificate Expiry Date
                    </Text>

                    <TextInput
                      name="outer_calibration_torque_date"
                      style={input.textInput}
                      value={formattedOCDate}
                      onFocus={() => setOCOpen(true)}
                    />
                    <DatePicker
                      modal
                      minimumDate={d}
                      mode="date"
                      open={OCopen}
                      date={outerOCDate}
                      onConfirm={date => {
                        setOCOpen(false);
                        setOuterOCDate(date);
                      }}
                      onCancel={() => {
                        setOCOpen(false);
                      }}
                    />

                    <Text style={styles.label}>Multiplier/Pump unit</Text>
                    <TextInput
                      name="outer_multiplier"
                      style={input.textInput}
                      onChangeText={handleChange('outer_multiplier')}
                      onBlur={handleBlur('outer_multiplier')}
                      value={values.outer_multiplier}
                    />

                    <Text style={styles.label}>
                      Calibration Multiplier Date
                    </Text>
                    <TextInput
                      name="outer_calibration_multiplier_date"
                      style={input.textInput}
                      value={formattedOMDate}
                      onFocus={() => setOMOpen(true)}
                    />
                    <DatePicker
                      modal
                      minimumDate={d}
                      mode="date"
                      open={OMopen}
                      date={OMDate}
                      onConfirm={date => {
                        setOMOpen(false);
                        setOMDate(date);
                      }}
                      onCancel={() => {
                        setOMOpen(false);
                      }}
                    />

                    <Text style={styles.label}>Tightening Torque Applied</Text>
                    <TextInput
                      name="outer_tightening"
                      style={input.textInput}
                      onChangeText={handleChange('outer_tightening')}
                      onBlur={handleBlur('outer_tightening')}
                      value={values.outer_tightening}
                    />
                    <Text style={styles.label}>Comments</Text>
                    <TextInput
                      name="outer_comments"
                      style={input.textInput}
                      onChangeText={handleChange('outer_comments')}
                      onBlur={handleBlur('outer_comments')}
                      value={values.outer_comments}
                    />
                  </View>
                </View>
              ) : (
                ''
              )}

              <ManageImages
                setImagesArray={setImagesArray}
                imagesArray={imagesArray}
              />

              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                  marginBottom: 10,
                }}
              />

              <Text style={styles.label}>Fitters Name</Text>
              <TextInput
                name="fitters_name"
                style={input.textInput}
                onChangeText={handleChange('fitters_name')}
                onBlur={handleBlur('fitters_name')}
                value={values.fitters_name}
              />

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature}
              />

              <Text style={styles.label}>Date</Text>
              <TextInput
                name="fitters_date"
                style={input.textInput}
                value={formattedDate}
                onFocus={() => setOpen(true)}
              />
              <DatePicker
                modal
                minimumDate={d}
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View style={{alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                  style={!submitting ? input.button : [input.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={submitting}>
                  <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                    {submitting ? 'Submitting' : 'Submit'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  label: {
    fontFamily: font.fontFamily,
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#f72d2d',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
    fontFamily: font.fontFamily,
    color: 'black',
  },
});

export default SlewRingBoltSheetForm;
