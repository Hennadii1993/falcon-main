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

const YardFabricationWorksheet = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [submitting, setSubmitting] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);

  const [assetStatus, setAssetStatus] = useState();

  const {status, data} = usePostRequest('/api/asset', {
    assetID: route.params.assetID,
    assetBarcode: route.params.assetBarcode,
  });

  const handleSubmit = async values => {
    
    setSubmitting(true);

    const requestBody = {
      workType: 2,
      assetID: route.params.assetID,
      workCompleted: values.workCompleted,
      reasonForWork: values.workReason,
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
      'Fabrication Worksheet Submitted',
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
                  <>
                    <TextInput
                      name="workCompleted"
                      style={input.textInputWorkComment}
                      onChangeText={handleChange('workCompleted')}
                      onBlur={handleBlur('workCompleted')}
                      value={values.workCompleted}
                      multiline={true}
                      numberOfLines={5}
                      placeholder="Work completed"
                    />

                    <TextInput
                      name="workReason"
                      style={input.textInputWorkComment}
                      onChangeText={handleChange('workReason')}
                      onBlur={handleBlur('workReason')}
                      value={values.workReason}
                      multiline={true}
                      numberOfLines={5}
                      placeholder="Reason for work"
                    />
                  </>

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
                    <View style={{width: '60%', borderWidth: 0.2, borderColor: 'grey', padding: 10, marginLeft: 2}}>
                      <DropDown
                        setDropDown={setAssetStatus}
                        value={
                          assetStatus ? assetStatus : data.assetData.assetStatus
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

                  {assetStatus && values.workCompleted &&
                  values.workReason ? (
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
                          Save Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
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

export default YardFabricationWorksheet;
