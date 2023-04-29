import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef} from 'react';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {} from 'react-native-keyboard-aware-scroll-view';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';
import {Formik} from 'formik';
import DropDown from '../../components/form/DropDown';
import CheckBox from '@react-native-community/checkbox';
import ManageImage from '../../components/ManageImage';

const YardSprayShotWorksheet = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [submitting, setSubmitting] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);

  const [assetStatus, setAssetStatus] = useState();

  const [workCompleted, setWorkCompleted] = useState();
  const [workReason, setWorkReason] = useState();

  const {status, data} = usePostRequest('/api/asset', {
    assetID: route.params.assetID,
    assetBarcode: route.params.assetBarcode,
  });

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      workType: 1,
      assetID: route.params.assetID,
      workCompleted: workCompleted,
      reasonForWork: workReason,
      newColour: values.newColour,
      newRAL: values.newRAL,
      oldColour: data.assetData.colour,
      assetStatus: assetStatus,
      selectedPhoto: imagesArray[0],
    };

    const res = await sendRequest(
      '/api/asset-save-work',
      User.token,
      requestBody,
    );

    Alert.alert(
      'Success',
      'Spray Shop Worksheet Submitted',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('YardAsset', {
              assetID: route.params.assetID,
            }),
        },
      ],

      {cancelable: false},
    );
  };

  const loginValidationSchema = yup.object().shape({});

  if (status == 'fetched') {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <>
            <Formik
              style={styles.form}
              enableReinitialize
              initialValues={{
                serialNumber: data.assetData.serialNumber,
                colourRAL: data.assetData.colourRAL,
                colour: data.assetData.colour,
                assetLocation: data.assetData.assetLocation,
              }}
              onSubmit={values => handleSubmit(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Current Colour</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={{...styles.label, color: 'grey'}}>
                          {data.assetData.colour}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>CurrentRAL</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={{...styles.label, color: 'grey'}}>
                          {data.assetData.colourRAL}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                      <Text style={{fontFamily: font.fontFamily, fontSize: 12, color: 'black'}}>
                        WORK COMPLETED
                      </Text>
                    </View>

                    <View style={{width: '95%'}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          padding: 5,
                        }}>
                        <Text style={styles.label}>Respray</Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={workCompleted === 'Respray' ? true : false}
                          onValueChange={() => setWorkCompleted('Respray')}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          padding: 5,
                        }}>
                        <Text style={styles.label}>Shotblast</Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={workCompleted === 'Shotblast' ? true : false}
                          onValueChange={() => setWorkCompleted('Shotblast')}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          padding: 5,
                        }}>
                        <Text style={styles.label}>Shotblast and respray</Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={
                            workCompleted === 'Shotblast and respray'
                              ? true
                              : false
                          }
                          onValueChange={() =>
                            setWorkCompleted('Shotblast and respray')
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{padding: 10, marginTop: 10, marginBottom: 10}}>
                      <Text style={{fontFamily: font.fontFamily, fontSize: 12, color: 'black'}}>
                        REASON FOR WORK
                      </Text>
                    </View>

                    <View style={{width: '95%'}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          padding: 5,
                        }}>
                        <Text style={styles.label}>
                          Component requires renewing
                        </Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={workReason === 'Renewing' ? true : false}
                          onValueChange={() => setWorkReason('Renewing')}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          padding: 5,
                        }}>
                        <Text style={styles.label}>
                          Component change of colour
                        </Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={workReason === 'ChangeColour' ? true : false}
                          onValueChange={() => setWorkReason('ChangeColour')}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          padding: 5,
                        }}>
                        <Text style={styles.label}>
                          Component required renewing after refurbishment
                        </Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={workReason === 'Refurbishment' ? true : false}
                          onValueChange={() => setWorkReason('Refurbishment')}
                        />
                      </View>
                    </View>

                    {workCompleted != 'Shotblast' ? (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '95%',
                            padding: 5,
                            marginTop: 20,
                          }}>
                          <View style={{width: '40%'}}>
                            <Text style={styles.label}>New Colour</Text>
                          </View>
                          <View style={{width: '60%'}}>
                            <TextInput
                              name="newColour"
                              style={{...input.loginInput, paddingLeft: 8}}
                              onChangeText={handleChange('newColour')}
                              onBlur={handleBlur('newColour')}
                              value={values.newColour}
                              placeholderTextColor={input.placeHolderColor}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '95%',
                            padding: 5,
                          }}>
                          <View style={{width: '40%'}}>
                            <Text style={styles.label}>New RAL Number</Text>
                          </View>
                          <View style={{width: '60%'}}>
                            <TextInput
                              name="newRAL"
                              style={{...input.loginInput, paddingLeft: 8}}
                              onChangeText={handleChange('newRAL')}
                              onBlur={handleBlur('newRAL')}
                              value={values.newRAL}
                              placeholderTextColor={input.placeHolderColor}
                            />
                          </View>
                        </View>
                      </>
                    ) : null}

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '95%',
                        alignItems: 'center',
                        padding: 5,
                        marginTop: 20,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Status</Text>
                      </View>
                      <View
                        style={{
                          width: '60%',
                          borderWidth: 0.2,
                          borderColor: 'grey',
                          padding: 10,
                          marginLeft: 2,
                        }}>
                        <DropDown
                          setDropDown={setAssetStatus}
                          value={
                            assetStatus
                              ? assetStatus
                              : data.assetData.assetStatus
                          }
                          items={data.assetStatuses.map(item => ({
                            label: item.assetStatusName,
                            value: item.assetStatusID,
                          }))}
                        />
                      </View>
                    </View>

                    <ManageImage
                      setImagesArray={setImagesArray}
                      imagesArray={imagesArray}
                    />

                    {assetStatus &&
                    workCompleted &&
                    workReason &&
                    values.newColour &&
                    values.newRAL ? (
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
                              color: 'black'
                            }}>
                            Update Component
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </>
              )}
            </Formik>
          </>
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
    color: 'black'
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
});

export default YardSprayShotWorksheet;
