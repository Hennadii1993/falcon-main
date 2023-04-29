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

const RamsAmendmentAdd = ({route}) => {
  const navigation = useNavigation();

  const popAction = StackActions.pop(2);

  const User = useUserStore();

  const params = route.params;

  const [imagesArray, setImagesArray] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const [signature, setSignature] = useState(false);
  const [signature2, setSignature2] = useState(false);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      latitude: '52.622175037756',
      longitude: '0.94407096593361',
      documentID: params.documentID,
      commentBody: values.details,
      selectedPhoto: imagesArray[0],
      signatureManager: signature,
      signatureSupervisor: signature2,
      isAmendment: 1,
    };

    const res = await sendRequest('/api/comment-add', User.token, requestBody);

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
              <Text style={styles.label}>Amendment Details</Text>
              <TextInput
                name="details"
                style={input.textInputWorkComment}
                onChangeText={handleChange('details')}
                onBlur={handleBlur('details')}
                value={values.details}
                multiline={true}
                numberOfLines={5}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: font.fontFamily,
                  fontWeight: '500',
                  fontSize: 17,
                  marginTop: 30,
                  color: 'black'
                }}>
                SUPERVISOR SIGNATURE
              </Text>
              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: font.fontFamily,
                  fontWeight: '500',
                  fontSize: 17,
                  marginTop: 30,
                  color: 'black'
                }}>
                SITE MANAGER SIGNATURE
              </Text>

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature2}
              />

              <ManageImage
                setImagesArray={setImagesArray}
                imagesArray={imagesArray}
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
                    {submitting ? 'Saving amendment' : 'Save amendment'}
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

export default RamsAmendmentAdd;
