import * as React from 'react';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {font, input} from '../../config';
import {sendRequest} from '../../client';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {useUserStore} from '../../store';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';

const HolidayRequest = ({route}) => {
  const navigation = useNavigation();

  const [checkboxFrom, setCheckboxFrom] = useState(false);
  const [checkboxTo, setCheckboxTo] = useState(false);

  const loginValidationSchema = yup.object().shape({});

  const [selectedDates, setSelectedDates] = useState({});

  const User = useUserStore();

  const filterActualHolidayDays = dates => {
    return Object.entries(dates)
      .filter(([date, value]) => value.selectedColor == 'red')
      .map(date => date[0]);
  };

  const getBookend = (datesArray, i) => {

    if (datesArray.length == 0) {
      return null;
    }

    const datesSorted = datesArray.sort((a, b) => new Date(a) - new Date(b));

    if (i == 'first') {
      return datesSorted[0];
    } else {
      return datesSorted.pop();
    }
  };

  useEffect(() => {
    getBlocked();
  }, []);

  const getBlocked = async values => {
    const res = await sendRequest('/api/holidays-blocked', User.token, {});
    setSelectedDates(res.blocked);
  };

  const handleSubmit = async values => {
    const res = await sendRequest('/api/holidays-request-verify', User.token, {
      dates: filterActualHolidayDays(selectedDates).sort(
        (a, b) => new Date(a) - new Date(b),
      ),
      fromHalf: checkboxFrom ? 1 : 0,
      toHalf: checkboxTo ? 1 : 0,
    });

    // check that at least 0.5 working days have been selected
    if (res.days === 0) {
      Alert.alert('Error', `You have not selected any working days`);
    }

    // not valid - trying to book more holiday than they have
    if (!res.valid) {
      Alert.alert(
        `Please confirm`,
        `Please note, with this request you have exceeded your annual holiday entitlement. Your line manager will call you shortly to discuss this request. Do you want to proceed?`,
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              confirmHolidayRequest([checkboxFrom ? 1 : 0, checkboxTo ? 1 : 0]);
            },
          },
        ],
      );
    }

    // valid - get confirmation they want to request
    if (res.valid & (res.days > 0)) {
      Alert.alert(
        `Please confirm`,
        `You are requesting to book ${res.days} days holiday - is this correct?`,
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              confirmHolidayRequest([checkboxFrom ? 1 : 0, checkboxTo ? 1 : 0]);
            },
          },
        ],
      );
    }
  };

  const confirmHolidayRequest = async values => {
    const res = await sendRequest('/api/holidays-request', User.token, {
      dates: filterActualHolidayDays(selectedDates).sort(
        (a, b) => new Date(a) - new Date(b),
      ),
      fromHalf: values[0],
      toHalf: values[1],
    });

    if (res.status == 'success') {
      Alert.alert(
        'Success',
        'Your holiday request has been submitted',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(`There was an error submitting your request`);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Text
        style={{
          fontWeight: '300',
          backgroundColor: 'white',
          width: '100%',
          textAlign: 'center',
          marginBottom: 5,
          marginTop: 5,
          ...styles.label,
        }}>
        Please select the dates you would like to request holiday for
      </Text>

      <Calendar
        markingType={'multi-period'}
        firstDay={6}
        markedDates={selectedDates}
        onDayPress={object => {
          const thisDate = object.dateString;
          const formattedDate = {
            [thisDate]: {selected: true, selectedColor: 'red'},
          };

          const alreadySelected = selectedDates.hasOwnProperty(thisDate);

          if (alreadySelected) {
            if (selectedDates[thisDate].selectedColor == 'grey') {
              return;
            }
            delete selectedDates[thisDate];
            setSelectedDates({...selectedDates});
          } else {
            setSelectedDates({...selectedDates, ...formattedDate});
          }
        }}
      />

      <View style={styles.mainContainer}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            dateFrom: '',
            dateTo: '',
            toHalf: '',
            fromHalf: '',
          }}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isValid,
          }) => (
            <>
              {filterActualHolidayDays(selectedDates).length >
              0 ? (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 10,
                      }}>
                      <Text style={styles.label}>
                        Is{' '}
                        <Text style={{...styles.label, fontWeight: '400'}}>
                          {moment(
                            getBookend(
                              filterActualHolidayDays(selectedDates),
                              'first',
                            ),
                          ).format('ddd Do MMM YY')}
                        </Text>{' '}
                        a half day?{'\n'} Still working in the morning?
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 10,
                      }}>
                      <CheckBox
                        disabled={false}
                        type={'checkbox'}
                        name="fromHalf"
                        tintColor="orange"
                        onCheckColor="green"
                        onTintColor="green"
                        tintColors={{ true: 'green', false: 'grey' }}
                        value={checkboxFrom}
                        checked={checkboxFrom}
                        onValueChange={newValue => setCheckboxFrom(newValue)}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 10,
                      }}>
                      <Text style={styles.label}>
                        Is{' '}
                        <Text style={{...styles.label, fontWeight: '400'}}>
                          {moment(
                            getBookend(
                              filterActualHolidayDays(selectedDates),
                              'last',
                            ),
                          ).format('ddd Do MMM YY')}
                        </Text>{' '}
                        a half day? {'\n'}Still working in the afternoon?
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 10,
                      }}>
                      <CheckBox
                        disabled={false}
                        name="toHalf"
                        tintColor="orange"
                        onCheckColor="green"
                        onTintColor="green"
                        tintColors={{ true: 'green', false: 'grey' }}
                        value={checkboxTo}
                        onValueChange={newValue => setCheckboxTo(newValue)}
                      />
                    </View>
                  </View>

                  <View style={{alignItems: 'center', marginBottom: 30}}>
                    <TouchableOpacity
                      style={
                        isValid
                          ? input.button
                          : [input.button, styles.buttonDisabled]
                      }
                      onPress={handleSubmit}
                      disabled={!isValid}>
                      <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                        Submit Request
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}
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
    color: 'black'
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
  button: {
    padding: 10,
    elevation: 2,
  },
});

export default HolidayRequest;
