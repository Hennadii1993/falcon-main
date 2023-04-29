import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ManageImages from '../../components/ManageImages';
import MySignaturePad from '../../components/MySignaturePad';
import SwitchToggle from 'react-native-switch-toggle';
import {formatDay} from '../../utilities';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import DropDown75100 from '../../components/form/DropDown75100';
import {ScrollView} from 'react-native-gesture-handler';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const LoadTestCertificateForm = ({route}) => {
  const navigation = useNavigation();

  // crane from previous form
  const linkID = route.params.linkID;

  const User = useUserStore();

  // const [fullSetSwitchOn, setFullSetSwitchOn] = useState(true);

  const [imagesArray, setImagesArray] = useState([]);

  const [value75100, setValue75100] = useState();

  const [toggleDate, setToggleDate] = useState(true);
  const [toggleFurtherWork, setToggleFurtherWork] = useState(false);

  const [dateRecent, setDateRecent] = useState(new Date());
  const [openRecent, setOpenRecent] = useState(false);
  const formattedDateRecent = formatDay(dateRecent);

  const dateRecentArray = formattedDateRecent.split('/');
  const formattedRD =
    dateRecentArray[2] + '-' + dateRecentArray[1] + '-' + dateRecentArray[0];

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = formatDay(date);

  const dateArray = formattedDate.split('/');
  const formattedD = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [signature, setSignature] = useState(false);
  const [signature2, setSignature2] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  const handleSubmit = async values => {
    setSubmitting(true);

    // 75%/100% dropdown

    const builderData = JSON.stringify({
      recent_examination: formattedRD,
      recent_examination_na: toggleDate,
      date_examination: formattedD,
      swl_1_kg: values.dutiesKg,
      swl_1_m: values.dutiesM,
      swl_2_type: value75100,
      swl_2_kg: values.duties2Kg,
      swl_2_m: values.duties2M,
      swl_3_kg: values.momentKg,
      swl_3_m: values.momentM,
      // defects_rectified: "", not on the form?
      address: values.ownerEquipment,
      further_work: toggleFurtherWork,
      further_work_description: values.furtherWork,
      defects: values.defects,
      repairs: values.alterations,
      test_carried: values.examination,
      person_responsible: values.examinationPerson,
      person_authenticating: values.authenticatingPerson,
    });

    const requestBody = {
      linkID: linkID,
      formType: 'load_certificate',
      builderData,
      signature,
      signature2,
      selectedPhotos: imagesArray,
    };

    if (signature.length > 0 && signature2.length > 0 && values.examinationPerson && values.authenticatingPerson) {
      const res = await sendRequest(
        '/api/formbuilder-submit',
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
      setSubmitting(false);
      Alert.alert('Error', 'Please ensure you have printed your name and signed');
    }
  };

  const loginValidationSchema = yup.object().shape({});

  return (
    <KeyboardAwareScrollView scrollEnabled={scrollEnabled}>
      <View style={styles.mainContainer}>
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
            ownerEquipment:
              'Falcon Tower Cranes Ltd,\nShipdham Airfield Industrial Estate,\nShipdham,\nNorfolk,\nIP25 7SD',
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
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 10,
                  }}>
                  <Text style={styles.label}>
                    Is most recent examination date relevant?
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
                    tintColors={{true: 'green', false: 'grey'}}
                    value={toggleDate}
                    onValueChange={newValue => setToggleDate(newValue)}
                  />


                </View>
              </View>

              {toggleDate ? (
                <>
                  <Text style={styles.label}>
                    Date of most recent examination
                  </Text>
                  <TextInput
                    name="dateRecent"
                    style={input.textInput}
                    value={formattedDateRecent}
                    onFocus={() => setOpenRecent(true)}
                  />
                  <DatePicker
                    modal
                    minimumDate={d}
                    mode="date"
                    open={openRecent}
                    date={dateRecent}
                    onConfirm={dateRecent => {
                      setOpenRecent(false);
                      setDateRecent(dateRecent);
                    }}
                    onCancel={() => {
                      setOpenRecent(false);
                    }}
                  />
                </>
              ) : null}

              <Text style={styles.label}>Date of examination</Text>
              <TextInput
                name="dateRequired"
                style={input.textInput}
                value={formattedDate}
                onFocus={() => setOpen(true)}
              />
              <DatePicker
                modal
                minimumDate={d}
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View style={styles.headerContainerYellow}>
                <Text style={styles.headerText}>
                  SWL OF EQUIPMENT (WHERE RELEVANT)
                </Text>
              </View>

              <View style={styles.headerContainerGrey}>
                <Text style={styles.headerText}>110% Duties</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 2,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}>
                  <Text style={styles.label}>KG @</Text>
                  <TextInput
                    name="dutiesKg"
                    style={input.textInput}
                    onChangeText={handleChange('dutiesKg')}
                    onBlur={handleBlur('dutiesKg')}
                    value={values.dutiesKg}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <Text style={styles.label}>M</Text>
                    <TextInput
                      name="dutiesM"
                      style={input.textInput}
                      onChangeText={handleChange('dutiesM')}
                      onBlur={handleBlur('dutiesM')}
                      value={values.dutiesM}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.headerContainerGrey}>
                <Text style={styles.headerText}>
                  100% or 75% Duties Line Pull
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>


                <View
                  style={{
                    width: 200,
                    borderWidth: 0.2,
                    borderColor: 'grey',
                    padding: 10,
                    margin: 5,
                    marginLeft: 80,
                  }}>
                  <DropDown75100 setValue75100={setValue75100} />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 2,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}>
                  <Text style={styles.label}>KG @</Text>
                  <TextInput
                    name="duties2Kg"
                    style={input.textInput}
                    onChangeText={handleChange('duties2Kg')}
                    onBlur={handleBlur('duties2Kg')}
                    value={values.duties2Kg}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <Text style={styles.label}>M</Text>
                    <TextInput
                      name="duties2M"
                      style={input.textInput}
                      onChangeText={handleChange('duties2M')}
                      onBlur={handleBlur('duties2M')}
                      value={values.duties2M}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.headerContainerGrey}>
                <Text style={styles.headerText}>Moment</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 2,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}>
                  <Text style={styles.label}>KG @</Text>
                  <TextInput
                    name="momentKg"
                    style={input.textInput}
                    onChangeText={handleChange('momentKg')}
                    onBlur={handleBlur('momentKg')}
                    value={values.momentKg}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      padding: 2,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}>
                    <Text style={styles.label}>M</Text>
                    <TextInput
                      name="momentM"
                      style={input.textInput}
                      onChangeText={handleChange('momentM')}
                      onBlur={handleBlur('momentM')}
                      value={values.momentM}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                  marginBottom: 10,
                }}
              />

              <Text style={styles.label}>Owner Of Equipment</Text>
              <TextInput
                name="ownerEquipment"
                style={input.textInputLong}
                onChangeText={handleChange('ownerEquipment')}
                onBlur={handleBlur('ownerEquipment')}
                value={values.ownerEquipment}
                multiline={true}
              />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 10,
                  }}>
                  <Text style={styles.label}>Is further work required?</Text>
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
                    tintColors={{true: 'green', false: 'grey'}}
                    value={toggleFurtherWork}
                    onValueChange={newValue => setToggleFurtherWork(newValue)}
                  />
                </View>
              </View>

              {toggleFurtherWork ? (
                <>
                  <TextInput
                    name="furtherWork"
                    placeholder="Further work"
                    style={input.textInputLong}
                    onChangeText={handleChange('furtherWork')}
                    onBlur={handleBlur('furtherWork')}
                    value={values.furtherWork}
                    multiline={true}
                  />
                </>
              ) : null}

              <Text style={styles.label}>Details Of Defects</Text>
              <TextInput
                name="defects"
                placeholder="If none state NONE"
                style={input.textInputLong}
                onChangeText={handleChange('defects')}
                onBlur={handleBlur('defects')}
                value={values.defects}
                multiline={true}
              />

              <Text style={styles.label}>
                Detail of any repairs renewal or alterations required
              </Text>
              <TextInput
                name="alterations"
                style={input.textInputLong}
                onChangeText={handleChange('alterations')}
                onBlur={handleBlur('alterations')}
                value={values.alterations}
                multiline={true}
              />

              <Text style={styles.label}>
                Details of any test carried out during examination
              </Text>
              <TextInput
                name="examination"
                style={input.textInputLong}
                onChangeText={handleChange('examination')}
                onBlur={handleBlur('examination')}
                value={values.examination}
                multiline={true}
              />

              <ManageImages
                setImagesArray={setImagesArray}
                imagesArray={imagesArray}
              />

              <Text style={styles.label}>
                Person responsible for examination
              </Text>
              <TextInput
                name="examinationPerson"
                style={input.textInput}
                onChangeText={handleChange('examinationPerson')}
                onBlur={handleBlur('examinationPerson')}
                value={values.examinationPerson}
                multiline={true}
              />

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature}
              />

              <Text style={styles.label}>
                Person authenticating this record
              </Text>
              <TextInput
                name="authenticatingPerson"
                style={input.textInput}
                onChangeText={handleChange('authenticatingPerson')}
                onBlur={handleBlur('authenticatingPerson')}
                value={values.authenticatingPerson}
                multiline={true}
              />

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature2}
              />

              <View style={{alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                  style={!submitting ? input.button : [input.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={submitting}>
                  <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
    fontFamily: font.fontFamily,
    color: 'black',
  },
  headerContainerYellow: {
    backgroundColor: '#fdc73e',
    marginTop: 6,
    width: '100%',
  },
  headerContainerGrey: {
    backgroundColor: '#deddd7',
    marginTop: 6,
    width: '100%',
  },
  headerText: {
    color: 'black',
    padding: 3,
    margin: 5,
    width: '100%',
  },
});

export default LoadTestCertificateForm;
