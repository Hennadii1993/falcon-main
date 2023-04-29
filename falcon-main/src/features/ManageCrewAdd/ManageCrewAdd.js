import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import ManageImage from '../../components/ManageImage';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';
import {StackActions} from '@react-navigation/native';
import MySignaturePad from '../../components/MySignaturePad';
import DropDown from '../../components/form/DropDown';

const ManageCrewAdd = ({route}) => {
  const navigation = useNavigation();

  const popAction = StackActions.pop(2);

  const User = useUserStore();

  const params = route.params;

  const [submitting, setSubmitting] = useState(false);

  const [signature, setSignature] = useState(false);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [type, setType] = useState(true);

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      latitude: '52.622175037756',
      longitude: '0.94407096593361',
      documentID: params.documentID,
      crewCategory: type,
      crewName: values.name,
      crewCompany: values.company,
      data: signature,
    };

    const res = await sendRequest('/api/crew-add', User.token, requestBody);

    navigation.dispatch(popAction);
  };

  const loginValidationSchema = yup.object().shape({});

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <View style={styles.mainContainer}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            comment: '',
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
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  fontSize: 12,
                  marginTop: 2,
                  color: 'black'
                }}>
                I confirm that i have read the RAMS document
              </Text>

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature}
              />

              <View style={{width: '100%'}}>
                <Text style={styles.label}>Type</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.2,
                  borderColor: 'grey',
                  padding: 10,
                  marginLeft: 2,
                }}>
                <DropDown
                  setDropDown={setType}
                  items={[
                    {label: 'Crew Member', value: '1'},
                    {label: 'Site member', value: '2'},
                    {label: 'Subcontractor', value: '3'},
                    {label: 'Mobile operator', value: '5'},
                    {label: 'Supervisor', value: '6'},
                    {label: 'Lead erector', value: '8'},
                    {label: 'Electrician', value: '7'},
                    {label: 'Other', value: '4'},
                  ]}
                />
              </View>

              <Text style={styles.label}>Name</Text>
              <TextInput
                name="name"
                style={input.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />

              <Text style={styles.label}>Company</Text>
              <TextInput
                name="company"
                style={input.textInput}
                onChangeText={handleChange('company')}
                onBlur={handleBlur('company')}
                value={values.company}
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
                    {submitting ? 'Adding crew member' : 'Add crew member'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
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

export default ManageCrewAdd;
