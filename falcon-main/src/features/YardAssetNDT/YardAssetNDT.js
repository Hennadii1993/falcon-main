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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';
import {Formik} from 'formik';
import CheckBox from '@react-native-community/checkbox';
import ManageImage from '../../components/ManageImage';
import DropDown from '../../components/form/DropDown';

const YardAssetNDT = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [submitting, setSubmitting] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);

  const [assetStatus, setAssetStatus] = useState();

  const [weldsStatus, setWeldsStatus] = useState();

  const {status, data} = usePostRequest('/api/asset', {
    assetID: route.params.assetID,
    assetBarcode: route.params.assetBarcode,
  });

  const [toggleFaults, setToggleFaults] = useState(false);
  const [toggleFurther, setToggleFurther] = useState(false);

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      workType: 3,
      assetID: route.params.assetID,
      weldsTested: weldsStatus,
      faultsFound: toggleFaults,
      furtherWork: toggleFurther,
      furtherWorkInfo: values.furtherWorkInfo,
      namePersonCompletedTest: values.namePersonCompletedTest,
      namePersonInspectedTest: values.namePersonInspectedTest,
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
      'NDT Test Submitted',
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
              initialValues={{}}
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
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text style={styles.label}>
                          Percentage of welds tested
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          borderWidth: 0.2,
                          borderColor: 'grey',
                          padding: 10,
                          marginLeft: 2,
                        }}>
                        <DropDown
                          setDropDown={setWeldsStatus}
                          value={weldsStatus}
                          items={[
                            {label: '0%', value: '0'},
                            {label: '5%', value: '5'},
                            {label: '10%', value: '10'},
                            {label: '15%', value: '15'},
                            {label: '20%', value: '20'},
                            {label: '25%', value: '25'},
                            {label: '30%', value: '30'},
                            {label: '35%', value: '35'},
                            {label: '40%', value: '40'},
                            {label: '45%', value: '45'},
                            {label: '50%', value: '50'},
                            {label: '55%', value: '55'},
                            {label: '60%', value: '60'},
                            {label: '65%', value: '65'},
                            {label: '70%', value: '70'},
                            {label: '75%', value: '75'},
                            {label: '80%', value: '80'},
                            {label: '85%', value: '85'},
                            {label: '90%', value: '90'},
                            {label: '95%', value: '95'},
                            {label: '100%', value: '100'},
                          ]}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '70%'}}>
                        <Text style={styles.label}>Faults found</Text>
                      </View>
                      <View style={{width: '30%'}}>
                        <CheckBox
                          disabled={false}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={toggleFaults}
                          onValueChange={newValue => setToggleFaults(newValue)}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '70%'}}>
                        <Text style={styles.label}>Further work required?</Text>
                      </View>
                      <View style={{width: '30%'}}>
                        <CheckBox
                          disabled={false}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={toggleFurther}
                          onValueChange={newValue => setToggleFurther(newValue)}
                        />
                      </View>
                    </View>

                    {toggleFurther ? (
                      <View>
                        <TextInput
                          name="furtherWorkInfo"
                          style={input.textInputLong}
                          onChangeText={handleChange('furtherWorkInfo')}
                          onBlur={handleBlur('furtherWorkInfo')}
                          value={values.furtherWorkInfo}
                          multiline={true}
                          numberOfLines={5}
                        />
                      </View>
                    ) : null}

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
                      <View style={{width: '50%'}}>
                        <Text style={styles.label}>
                          Name of person who completed the test
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <TextInput
                          name="namePersonCompletedTest"
                          style={{...input.loginInput, paddingLeft: 8}}
                          onChangeText={handleChange('namePersonCompletedTest')}
                          onBlur={handleBlur('namePersonCompletedTest')}
                          value={values.namePersonCompletedTest}
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
                        marginTop: 20,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text style={styles.label}>
                          Name of person who inspected the test
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <TextInput
                          name="namePersonInspectedTest"
                          style={{...input.loginInput, paddingLeft: 8}}
                          onChangeText={handleChange('namePersonInspectedTest')}
                          onBlur={handleBlur('namePersonInspectedTest')}
                          value={values.namePersonInspectedTest}
                          placeholderTextColor={input.placeHolderColor}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text style={styles.label}>New status</Text>
                      </View>
                      <View
                        style={{
                          width: '50%',
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
                  </View>

                  <ManageImage
                    setImagesArray={setImagesArray}
                    imagesArray={imagesArray}
                  />

                  {assetStatus &&
                  weldsStatus &&
                  values.namePersonCompletedTest &&
                  values.namePersonInspectedTest ? (
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

export default YardAssetNDT;
