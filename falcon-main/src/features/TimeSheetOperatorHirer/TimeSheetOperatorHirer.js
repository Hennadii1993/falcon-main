import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView,
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

const TimeSheetOperatorHirer = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const params = route.params;

  const {status, data} = usePostRequest('/api/address-book', {});

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);

  const [hirerEmails, setHirerEmails] = useState([]);
  let hirerEmailsImplode = hirerEmails.join(', ');

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async values => {
    setSubmitting(true);

    let finalEmailList = hirerEmailsImplode + ', ' + values.hirerEmail;

    if (signature.length > 10) {
      const requestBody = {
        date: params.date,
        signature: params.signature,
        linkID: params.linkID,
        operatorSignature: signature,
        bonus: values.bonus,
        hirerName: values.hirerName,
        hirerEmail: finalEmailList,
      };

      const res = await sendRequest(
        '/api/timesheet-submit',
        User.token,
        requestBody,
      );

      Alert.alert(
        'Success',
        'Your time sheet has been submitted',
        [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
        {cancelable: false},
      );
    } else {
      setSubmitting(false);
      Alert.alert('Please sign.');
    }
  };

  if (status == 'fetched') {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        scrollEnabled={scrollEnabled}>
        <View style={styles.mainContainer}>
          <Formik
            validationSchema={''}
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
                {/* <View style={{display: 'flex', flexDirection: 'column'}}> */}
                <TouchableOpacity
                  style={{...input.button, width: '80%'}}
                  onPress={() => {
                    navigation.navigate('TimeSheetOperation', {
                      date: params.date,
                      linkID: params.linkID
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    VIEW TIME SHEET BEFORE SIGNING
                  </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Hirer Name</Text>
                <TextInput
                  name="hirerName"
                  style={{...input.textInput, paddingLeft: 10}}
                  onChangeText={handleChange('hirerName')}
                  onBlur={handleBlur('hirerName')}
                  value={values.hirerName}
                />

                <Text style={styles.label}>Hirer Email</Text>
                <TextInput
                  name="hirerEmail"
                  style={{...input.textInput, paddingLeft: 10}}
                  onChangeText={handleChange('hirerEmail')}
                  onBlur={handleBlur('hirerEmail')}
                  value={values.hirerEmail}
                  placeholder={
                    'Enter email address, seperate multiple email addresses with a comma'
                  }
                  placeholderTextColor={input.placeHolderColor}
                  multiline={true}
                />

                <Text style={styles.label}>Additional Emails</Text>
                <TextInput
                  name="hirerEmailList"
                  style={{...input.textInput, paddingLeft: 10}}
                  onChangeText={handleChange('hirerEmailList')}
                  onBlur={handleBlur('hirerEmailList')}
                  value={hirerEmails ? hirerEmailsImplode : ''}
                  placeholder={'Select any additional emails from below'}
                  placeholderTextColor={input.placeHolderColor}
                  multiline={true}
                />

                <View style={{width: '100%'}}>
                  <Text style={styles.label}>
                    Tap any of the emails below to add/remove from the email
                    list
                  </Text>
                  {data.results.map((email, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        if (hirerEmails.indexOf(email) !== -1) {
                          const emailsWithoutEmail = hirerEmails.filter(
                            i => i != email,
                          );
                          setHirerEmails([...emailsWithoutEmail]);
                        } else {
                          setHirerEmails([email, ...hirerEmails]);
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: font.fontFamily,
                          padding: 5,
                          color: 'black',
                        }}>
                        {email}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Bonus Authorised</Text>
                <TextInput
                  name="bonus"
                  style={{...input.textInput, paddingLeft: 10}}
                  onChangeText={handleChange('bonus')}
                  onBlur={handleBlur('bonus')}
                  value={values.bonus}
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
                {/* </View> */}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
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

export default TimeSheetOperatorHirer;
