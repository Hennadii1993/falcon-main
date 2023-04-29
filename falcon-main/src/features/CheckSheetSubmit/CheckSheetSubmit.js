import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
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
import {usePostRequest} from '../../client';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CheckSheetSubmit = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const params = route.params;

  const {status, data} = usePostRequest('/api/checklist', {
    date: params.date,
    linkID: params.linkID,
  });

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [checked, setChecked] = useState([]);

  // function addRemoveCheck(value) {
  //   console.log(value);
  //   if (value) {
  //     if (checked.includes(value)) {
  //       const index = checked.indexOf(value);
  //       if (index > -1) {
  //         checked.splice(index, 1);
  //       }
  //     } else {
  //       checked.push(value);
  //     }
  //   }
  // }

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

  const handleSubmit = async values => {
    setSubmitting(true);

    if (signature.length > 10) {
      const requestBody = {
        date: params.date,
        linkID: params.linkID,
        signature: signature,
        checklistDataWeekly: JSON.stringify(checked),
        siteManagerEmail: values.siteManagerEmail,
      };

      const res = await sendRequest(
        '/api/checklist-submit',
        User.token,
        requestBody,
      );

      Alert.alert(
        'Done',
        'Your check sheet has been submitted',
        [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
        {cancelable: false},
      );
    } else {
      Alert.alert('Please sign');
      setSubmitting(false);
    }
  };

  if (status == 'fetched') {
    return (
      <KeyboardAwareScrollView scrollEnabled={scrollEnabled}>
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
                {data.tasks.weekly.map((day, key) => (
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

                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                    marginTop: 8,
                  }}
                />

                <View style={{width: '100%'}}>
                  <Text style={styles.label}>
                    The machine checklist will be used as the assessment of
                    maintenance carried out. It is also a valuable piece of
                    evidence to demonstrate that you have complied with current
                    legislation requirements.
                  </Text>
                </View>

                <View style={{width: '100%'}}>
                  <Text style={styles.label}>
                    You can contact our service manager on: 01362 822313 for the
                    specific details about this machine.
                  </Text>
                </View>

                <View style={{width: '100%'}}>
                  <Text style={styles.label}>
                    Please remember: If you ever see a serious defect on your
                    crane - REPORT IT IMMEDIATELY
                  </Text>
                </View>

                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                    marginBottom: 8,
                  }}
                />

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '100%',
                    padding: 5,
                  }}>
                  <Image
                    style={{
                      align: 'left',
                      width: 50,
                      height: 50,
                    }}
                    source={require('../../assets/images/falcon-yellow.png')}
                    resizeMode="contain"
                  />
                  <View style={{marginLeft: 10}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={{...styles.label, fontWeight: '500'}}>
                        {User.me.name}
                      </Text>
                    </View>
                    <Text style={styles.label}>SIGN BELOW</Text>
                  </View>
                </View>

                <Text style={styles.label}>Site Manager Email (Optional)</Text>
                <TextInput
                  name="siteManagerEmail"
                  style={input.textInputLong}
                  onChangeText={handleChange('siteManagerEmail')}
                  onBlur={handleBlur('siteManagerEmail')}
                  value={values.siteManagerEmail}
                  placeholder={
                    'Enter email address, seperate multiple email addresses with a comma'
                  }
                  multiline={true}
                  numberOfLines={5}
                />

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
});

export default CheckSheetSubmit;
