import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MySignaturePad from '../../components/MySignaturePad';
import {colours, font, input} from '../../config';
import {useState} from 'react';
import {validateYupSchema} from 'formik';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import * as yup from 'yup';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const WorkInstructionsCreateNewSignature = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const params = route.params;

  const [submitting, setSubmitting] = useState(false);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);
  const [signature2, setSignature2] = useState(false);

  const [customerAuthorisation, setCustomerAuthorisation] = useState(false);

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      workID: params.workID,
      signature,
      signatureAuth: signature2,
      customerAuth: customerAuthorisation ? true : false,
      customerName: values.customerName,
      customerPosition: values.customerPosition,
      customerEmail: values.customerEmail,
    };

    if (signature.length > 1) {
      const res = await sendRequest(
        '/api/work-instructions-signature',
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
    <ScrollView
      scrollEnabled={scrollEnabled}
      onTouchStart={console.log('start')}
      onTouchEnd={console.log('end')}
      style={{flex: 1, padding: 5}}>
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
            <MySignaturePad
              setScrollEnabled={setScrollEnabled}
              signatureHandler={setSignature}
            />

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  padding: 10,
                }}>
                <Text style={styles.label}>
                  Customer Authorisation Required?
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
                  tintColor="orange"
                  onCheckColor="green"
                  onTintColor="green"
                  tintColors={{ true: 'green', false: 'grey' }}
                  value={customerAuthorisation}
                  onValueChange={newValue => setCustomerAuthorisation(newValue)}
                />
              </View>
            </View>

            {customerAuthorisation ? (
              <>
                <ScrollView
                  style={{flex: 1, padding: 5, backgroundColor: 'white'}}
                  scrollEnabled={scrollEnabled}>
                  <Text style={styles.label}>Customer Name</Text>
                  <TextInput
                    name="customerName"
                    value={values.customerName}
                    style={input.textInput}
                    onChangeText={handleChange('customerName')}
                    onBlur={handleBlur('customerName')}
                  />
                  <Text style={styles.label}>Customer Position</Text>
                  <TextInput
                    name="customerPosition"
                    value={values.customerPosition}
                    style={input.textInput}
                    onChangeText={handleChange('customerPosition')}
                    onBlur={handleBlur('customerPosition')}
                  />
                  <Text style={styles.label}>Customer Email</Text>
                  <TextInput
                    name="customerEmail"
                    value={values.customerEmail}
                    style={input.textInput}
                    onChangeText={handleChange('customerEmail')}
                    onBlur={handleBlur('customerEmail')}
                  />
                  <MySignaturePad
                    setScrollEnabled={setScrollEnabled}
                    signatureHandler={setSignature2}
                  />
                </ScrollView>
              </>
            ) : null}

            <View
              style={{
                alignItems: 'center',
                marginBottom: 5,
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                style={!submitting ? input.button : [input.buttonDisabled]}
                onPress={handleSubmit}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default WorkInstructionsCreateNewSignature;
