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

  const {status, data} = usePostRequest('/api/checklist-pending-update', {
    date: route.params.date,
    linkID,
    dayOfWeek: route.params.day,
  });

  const [checked, setChecked] = useState([]);

  function addRemoveCheck(value) {
    const checkValue = Number(value);
    if (checkValue) {
      if (checked.includes(value)) {
        const checkedWithoutThisValue = checked.filter(x => x != value);
        setChecked(checkedWithoutThisValue);
      } else {
        setChecked([...checked, value]);
      }
    }
  }

  useEffect(() => {
    if (data && data.existing) {
      const filtered = data.existing.filter(x => x);
      const formatted = filtered.map(x => Number(x));
      setChecked(formatted);
    }
  }, [data]);

  const handleSubmit = async values => {
    const requestBody = {
      date: route.params.date,
      linkID: route.params.linkID,
      dayOfWeek: route.params.day,
      selectedTasks: JSON.stringify(checked),
    };

    const res = await sendRequest(
      '/api/checklist-pending-update-save',
      User.token,
      requestBody,
    );

    Alert.alert(
      'Done',
      'Check sheet saved',
      [{text: 'OK', onPress: () => navigation.navigate('CheckSheetsPending')}],
      {cancelable: false},
    );
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
                {data.tasks.daily.map((day, key) => (
                  <>
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerText}>{day.header}</Text>
                    </View>

                    {/* <Text>{JSON.stringify(checked)}</Text> */}

                    {day.items.map((item, key) => (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '95%',
                          }}>
                          <CheckBox
                            id={item.id}
                            disabled={false}
                            style={{width: 18, height: 18, padding: 2}}
                            animationDuration={0.001}
                            onTintColor={'#fdc73e'}
                            onCheckColor={'#878686'}
                            tintColor={'#878686'}
                            tintColors={{true: 'green', false: 'grey'}}
                            width={5}
                            value={
                              checked.length &&
                              checked.filter(x => x == item.id).length
                                ? true
                                : false
                            }
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
});

export default CheckSheet;
