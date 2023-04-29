import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
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
import {usePostRequest} from '../../client';
import {Icon} from '@rneui/themed';

const RamsSignatureSign = ({route}) => {
  const navigation = useNavigation();

  const popAction = StackActions.pop(1);

  const User = useUserStore();

  const params = route.params;

  const [submitting, setSubmitting] = useState(false);

  const [signature, setSignature] = useState(false);

  const {status, data} = usePostRequest('/api/rams-position-count-comments', {
    barcode: params.barcode,
  });

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      latitude: '52.622175037756',
      longitude: '0.94407096593361',
      barcode: params.barcode,
      data: signature,
    };

    const res = await sendRequest('/api/upload', User.token, requestBody);

    navigation.dispatch(popAction);
  };

  const loginValidationSchema = yup.object().shape({});

  if (status == 'fetched') {
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
                <View
                  style={{
                    width: 250,
                    padding: 10,
                    borderRadius: 5,
                    margin: 5,
                    backgroundColor: '#fdc73e',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RamsSignatureComments', {
                        barcode: params.barcode,
                      });
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: font.fontFamily,
                        fontWeight: '400',
                        color: 'black'
                      }}>
                      All Comments ({data.countComments})
                    </Text>
                  </TouchableOpacity>
                </View>

                {params.name ? (
                  <>
                    <Image
                      source={{
                        uri: `https://falcon.mindvision.co.uk/signatures/${params.barcode}.png`,
                      }}
                      style={{height: 200, width: '100%', margin: 5}}
                    />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          width: '100%',
                          padding: 10,
                        }}>
                        <Icon
                          name="credit-card"
                          type="feather"
                          color="black"
                          width="100%"
                          size={20}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontFamily: font.fontFamily,
                            fontWeight: '500',
                            fontSize: 18,
                            color: 'black'
                          }}>
                          {params.barcode}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          width: '100%',
                          padding: 10,
                        }}>
                        <Icon
                          name="user"
                          type="feather"
                          color="black"
                          width="100%"
                          size={20}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontFamily: font.fontFamily,
                            fontWeight: '500',
                            fontSize: 18,
                            color: 'black'
                          }}>
                          {params.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          width: '100%',
                          padding: 10,
                        }}>
                        <Icon
                          name="clock"
                          type="feather"
                          color="black"
                          width="100%"
                          size={20}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontFamily: font.fontFamily,
                            fontWeight: '500',
                            fontSize: 18,
                            color: 'black',
                          }}>
                          {params.signatureDate}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <MySignaturePad
                      setScrollEnabled={setScrollEnabled}
                      signatureHandler={setSignature}
                    />

                    <View style={{alignItems: 'center', marginBottom: 30}}>
                      <TouchableOpacity
                        style={
                          !submitting ? input.button : [input.buttonDisabled]
                        }
                        onPress={handleSubmit}
                        disabled={submitting}>
                        <Text
                          style={{
                            fontFamily: font.fontFamily,
                            fontWeight: '400',
                            color: 'black',
                          }}>
                          {submitting ? 'Saving signature' : 'Save signature'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
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

export default RamsSignatureSign;
