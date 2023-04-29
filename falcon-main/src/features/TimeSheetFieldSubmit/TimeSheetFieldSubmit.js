import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';
import MySignaturePad from '../../components/MySignaturePad';

const TimeSheetFieldSubmit = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const params = route.params;

  const handleSubmit = async values => {
    setSubmitting(true);
    if (
      signature.length > 10 &&
      values.timesheetVehicle &&
      values.timesheetMiles
    ) {
      const res = await sendRequest('/api/timesheet-submit-field', User.token, {
        date: params.date,
        timesheetVehicle: values.timesheetVehicle,
        timesheetMiles: values.timesheetMiles,
        signature: signature,
      });

      Alert.alert(
        'Done',
        'Your timesheet has been submitted',
        [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
        {cancelable: false},
      );
    } else {
      setSubmitting(false);
      Alert.alert(
        'Please enter your vehicle registration, total miles, and sign.',
      );
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      scrollEnabled={scrollEnabled}>
      <View style={styles.mainContainer}>
        <Formik
          validationSchema={''}
          initialValues={{
            vehicleReg: '',
            totalMiles: '',
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
                  justifyContent: 'center',
                  padding: 2,
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '50%',
                }}>
                <Text style={styles.label}>Vehicle Reg *</Text>
                <TextInput
                  name="timesheetVehicle"
                  style={input.textInput}
                  onChangeText={handleChange('timesheetVehicle')}
                  onBlur={handleBlur('timesheetVehicle')}
                  value={values.timesheetVehicle}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '50%',
                  marginBottom: 30,
                }}>
                <Text style={styles.label}>Total Miles *</Text>
                <TextInput
                  name="timesheetMiles"
                  style={input.textInput}
                  onChangeText={handleChange('timesheetMiles')}
                  onBlur={handleBlur('timesheetMiles')}
                  value={values.timesheetMiles}
                />
              </View>

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature}
              />

              <View style={{alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                  style={!submitting ? input.button : [input.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={submitting}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {submitting ? 'Submitting' : 'Submit'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
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
    fontWeight: '400',
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
  buttonOpenBlank: {
    backgroundColor: '#24B659',
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

export default TimeSheetFieldSubmit;
