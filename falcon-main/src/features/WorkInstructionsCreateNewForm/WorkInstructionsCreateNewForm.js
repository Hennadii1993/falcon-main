import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Dimensions,
  PermissionsAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import {colours, font, input} from '../../config';
import {formatDay, formatTime} from '../../utilities';
import {PortalProvider} from '@gorhom/portal';
import BottomSheet from '../../components/BottomSheet';
import ManageImages from '../../components/ManageImages';
import CheckBox from '@react-native-community/checkbox';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const WorkInstructionsCreateNewForm = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [submitting, setSubmitting] = useState(false);

  var d = new Date();
  d.setMonth(d.getMonth() -1);
  // d.setMonth(d.getMonth() + 1);

  // crane from previous form
  const linkID = route.params.linkID;

  // delivery date picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [timeOn, setTimeOn] = useState(new Date('2023-01-01T00:00:00.000Z'));
  const [timeOnOpen, setTimeOnOpen] = useState(false);

  const [timeOff, setTimeOff] = useState(new Date('2023-01-01T00:00:00.000Z'));
  const [timeOffOpen, setTimeOffOpen] = useState(false);

  const formattedDate = formatDay(date);
  const formattedTimeOn = formatTime(timeOn);
  const formattedTimeOff = formatTime(timeOff);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  // bottom sheet
  const modalRefWork = useRef(null);
  const onOpenWork = () => {
    modalRefWork.current?.open();
  };
  const onCloseWork = () => {
    modalRefWork.current?.close();
  };

  const modalRefFurther = useRef(null);
  const onOpenFurther = () => {
    modalRefFurther.current?.open();
  };
  const onCloseFurther = () => {
    modalRefFurther.current?.close();
  };

  const modalRefParts = useRef(null);
  const onOpenParts = () => {
    modalRefParts.current?.open();
  };
  const onCloseParts = () => {
    modalRefParts.current?.close();
  };

  const {height} = Dimensions.get('screen');
  const modalHeight = height * 0.7;

  const [imagesArray, setImagesArray] = useState([]);

  const handleSubmit = async values => {
    setSubmitting(true);

    const currentDateArray = formattedDate.split('/');
    const longDate =
      currentDateArray[2] +
      '-' +
      currentDateArray[1] +
      '-' +
      currentDateArray[0] +
      'T00:00:00.000Z';

    const requestBody = {
      linkID: linkID,
      furtherWorkText: values.furtherWorkRequired,
      partsUsed: values.partsUsed,
      reportedFault: values.reportedFault,
      workCarriedOut: values.workCarriedOut,
      timeOn: formatTime(timeOn),
      timeOff: formatTime(timeOff),
      furtherWork: values.furtherWorkRequired ? true : false,
      selectedPhotos: imagesArray,
      workInstructionDate: longDate,
    };

    const res = await sendRequest(
      '/api/work-instructions-add',
      User.token,
      requestBody,
    );

    navigation.navigate('WorkInstructionsCreateNewSignature', {
      workID: res.workID,
    });
  };

  const loginValidationSchema = yup.object().shape({
    // reportedFault: yup
    //   .string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required')
  });

  return (
    <ScrollView>
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
              <Text style={styles.label}>Date</Text>
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
              <Text style={styles.label}>Reported Fault</Text>
              <TextInput
                name="reportedFault"
                style={input.textInputLong}
                onChangeText={handleChange('reportedFault')}
                onBlur={handleBlur('reportedFault')}
                value={values.reportedFault}
                multiline={true}
                numberOfLines={5}
              />

              <PortalProvider>
                <View
                  style={{
                    backgroundColor: values.workCarriedOut ? 'green' : 'red',
                    ...styles.container,
                  }}>
                  <BottomSheet
                    modalRef={modalRefWork}
                    onClose={onCloseWork}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    title={'Work Carried Out'}
                    modalHeight={modalHeight}
                    values={values.workCarriedOut}
                    name="workCarriedOut"
                  />

                  <TouchableOpacity onPress={onOpenWork}>
                    <View
                      style={{
                        height: 40,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          fontSize: 19,
                        }}>
                        Work Carried Out?
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </PortalProvider>

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
                    tintColors={{ true: 'green', false: 'grey' }}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                </View>
              </View>

              {toggleCheckBox ? (
                <PortalProvider>
                  <View
                    style={{
                      backgroundColor: values.furtherWorkRequired
                        ? 'green'
                        : 'red',
                      ...styles.container,
                    }}>
                    <BottomSheet
                      modalRef={modalRefFurther}
                      onClose={onCloseFurther}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      title={'Further Work Required'}
                      modalHeight={modalHeight}
                      values={values.furtherWorkRequired}
                      name="furtherWorkRequired"
                    />
                    <TouchableOpacity onPress={onOpenFurther}>
                      <View
                        style={{
                          height: 40,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: font.fontFamily,
                            fontWeight: '400',
                            fontSize: 19,
                          }}>
                          Further Work Required?
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </PortalProvider>
              ) : null}

              <PortalProvider>
                <View
                  style={{
                    backgroundColor: values.partsUsed ? 'green' : 'red',
                    ...styles.container,
                  }}>
                  <BottomSheet
                    modalRef={modalRefParts}
                    onClose={onCloseParts}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    title={'Parts Used / Required'}
                    modalHeight={modalHeight}
                    values={values.partsUsed}
                    name="partsUsed"
                  />
                  <TouchableOpacity onPress={onOpenParts}>
                    <View
                      style={{
                        height: 40,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          fontSize: 19,
                        }}>
                        Parts Used / Required?
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </PortalProvider>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20,
                  }}>
                  <Text style={styles.label}>Time On Site</Text>
                  <TextInput
                    name="timeOnSite"
                    style={input.textInput}
                    value={formattedTimeOn}
                    onFocus={() => setTimeOnOpen(true)}
                  />
                  <DatePicker
                    name="timeOnOpen"
                    modal
                    locale={'en_GB'}
                    mode="time"
                    open={timeOnOpen}
                    date={timeOn}
                    onConfirm={timeOn => {
                      setTimeOnOpen(false);
                      setTimeOn(timeOn);
                    }}
                    onCancel={() => {
                      setTimeOnOpen(false);
                    }}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20,
                  }}>
                  <Text style={styles.label}>Time Off Site</Text>
                  <TextInput
                    name="timeOffSite"
                    style={input.textInput}
                    value={formattedTimeOff}
                    onFocus={() => setTimeOffOpen(true)}
                  />
                  <DatePicker
                    name="timeOffOpen"
                    modal
                    locale={'en_GB'}
                    mode="time"
                    open={timeOffOpen}
                    date={timeOff}
                    onConfirm={timeOff => {
                      setTimeOffOpen(false);
                      setTimeOff(timeOff);
                    }}
                    onCancel={() => {
                      setTimeOffOpen(false);
                    }}
                  />
                </View>
              </View>

              <ManageImages
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
                    {submitting ? 'Submitting' : 'Submit'}
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

export default WorkInstructionsCreateNewForm;
