import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef, useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';
import CheckBox from '@react-native-community/checkbox';

const CheckSheet = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const linkID = route.params.linkID;

  const {status, data} = usePostRequest('/api/checklist', {
    date: route.params.date,
    linkID,
  });

  const [checked, setChecked] = useState([]);
  const [days, setDays] = useState([]);

  function addRemoveCheck(value) {
    if (checked.includes(value)) {
      const checkedWithoutThisValue = checked.filter(x => x != value);
      setChecked(checkedWithoutThisValue);
    } else {
      setChecked([...checked, value]);
    }
  }

  function addRemoveDay(value) {
    if (days.includes(value)) {
      const daysWithoutThisValue = days.filter(x => x != value);
      setDays(daysWithoutThisValue);
    } else {
      setDays([...days, value]);
    }
  }

  const handleSubmit = async values => {
    if (days.length == 0) {
      Alert.alert('Please select at least one day');
    } else {
      const requestBody = {
        date: route.params.date,
        linkID: linkID,
        selectedDates: JSON.stringify(days),
        selectedTasks: JSON.stringify(checked),
      };

      const res = await sendRequest(
        '/api/checklist-save',
        User.token,
        requestBody,
      );

      Alert.alert(
        'Done',
        'Check sheet saved',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('CheckSheetsPending'),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const loginValidationSchema = yup.object().shape({});

  if (status == 'fetched') {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{}}
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
                <View>
                  <Text style={{...styles.headerText, fontSize: 10}}>
                    CHOOSE DATE(S)
                  </Text>
                </View>
                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                  }}
                />

                {data.dates.map((day, key) => (
                  <>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <CheckBox
                        id={day.key}
                        disabled={false}
                        style={{width: 18, height: 18, padding: 14, marginRight: 10}}
                        animationDuration={0.001}
                        onTintColor={'#fdc73e'}
                        onCheckColor={'#878686'}
                        tintColor={'#878686'}
                        tintColors={{true: 'green', false: 'grey'}}
                        // width={20}
                        // height={20}
                        value={days.includes(day.dateField) ? true : false}
                        onValueChange={() => {
                          addRemoveDay(day.dateField);
                        }}
                      />

                      <View style={styles.headerText}>
                        <Text style={styles.headerText}>
                          {day.dateFormatted}
                        </Text>
                      </View>
                    </View>
                  </>
                ))}

                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                  }}
                />

                {data.tasks.daily.map((day, key) => (
                  <>
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerText}>{day.header}</Text>
                    </View>

                    {day.items.map((item, key) => (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          <CheckBox
                            id={item.id}
                            disabled={false}
                            style={{width: 18, height: 18, padding: 14, marginRight: 10}}
                            animationDuration={0.001}
                            onTintColor={'#fdc73e'}
                            onCheckColor={'#878686'}
                            tintColor={'#878686'}
                            tintColors={{true: 'green', false: 'grey'}}
                            value={checked.includes(item.id) ? true : false}
                            onValueChange={() => {
                              addRemoveCheck(item.id);
                            }}
                          />

                          <View style={styles.headerText}>
                            <Text style={styles.headerText}>{item.name}</Text>
                          </View>
                        </View>
                      </>
                    ))}
                  </>
                ))}

                <View style={{alignItems: 'center', marginBottom: 30}}>
                  <TouchableOpacity style={input.button} onPress={handleSubmit}>
                    <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    );
  }
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
    fontSize: 15,
    fontWeight: '300',
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
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
  headerContainer: {
    backgroundColor: '#e5e5e5',
    marginTop: 6,
    width: '100%',
  },
  headerText: {
    color: 'black',
    padding: 2,
    margin: 3,
    width: '100%',
  },
  timeInput: {
    height: 60,
    width: 80,
    margin: 3,
    backgroundColor: '#fff',
    borderColor: '#C8C8C8',
    borderWidth: 0.5,
    paddingLeft: 20,
    fontWeight: '400',
    fontFamily: font.fontFamily,
    justifyContent: 'center',
    color: 'black',
  },
});

export default CheckSheet;
