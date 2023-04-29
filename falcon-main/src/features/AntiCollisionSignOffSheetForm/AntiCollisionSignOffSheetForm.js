import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import {colours, font, input} from '../../config';
import {formatDay, formatTime} from '../../utilities';
import ManageImages from '../../components/ManageImages';
import MySignaturePad from '../../components/MySignaturePad';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const AntiCollisionSignOffSheetForm = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  // crane from previous form
  const linkID = route.params.linkID;

  // delivery date picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const currentDate = formatDay(date);

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  const [signature, setSignature] = useState(false);
  const [signature2, setSignature2] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const currentDateArray = currentDate.split('/');
  const formattedDate =
    currentDateArray[2] +
    '-' +
    currentDateArray[1] +
    '-' +
    currentDateArray[0] +
    'T00:00:00.000Z';

  const [imagesArray, setImagesArray] = useState([]);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleSubmit = async values => {

    setSubmitting(true)

    const builderData = JSON.stringify({
      formDate: formattedDate,
      description_equipment: values.descriptionOfEquipment,
      equipment_serials: values.equipmentSerialNumbers,
      comments: values.comments,
      name: values.name,
      authenticating_name: values.authenticatingName,
    });

    const requestBody = {
      linkID: linkID,
      formType: 'anti_collision',
      builderData,
      signature,
      signature2,
      selectedPhotos: imagesArray,
    };

    if (signature.length > 1 && signature2.length > 1) {
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
      Alert.alert('Please Sign');
    }
  };

  const loginValidationSchema = yup.object().shape({});

  return (
    <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={scrollEnabled}>
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
              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                }}>
                Details of tests carried out:
              </Text>
              <Text style={styles.label}>
                Systems checked to correct zoning as per site drawing and for
                the prevention of entanglement between tower cranes.
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                }}>
                Declaration:
              </Text>
              <Text style={styles.label}>
                This is to confirm that the Anti-collision / zoning system has
                been checked and the limitations installed as required, as per
                site drawing. The systems performance and correct operation was
                checked in accordance with the manufacturer’s specifications.
              </Text>
              <Text style={styles.label}>
                An Anemometer has been fitted with a digital read out in the cab
                incorporating a flashing light system on the outside (
                <Text
                  style={{
                    color: '#F99207',
                    fontWeight: '400',
                    ...styles.label,
                  }}>
                  orange{' '}
                </Text>
                approaching limit and{' '}
                <Text
                  style={{
                    color: '#F91507',
                    fontWeight: '400',
                    ...styles.label,
                  }}>
                  red
                </Text>{' '}
                with siren to stop work).
              </Text>
              <Text style={styles.label}>
                The wind speed limit is 38MPH =61KPH
              </Text>
              <Text style={styles.label}>
                Name and address of person responsible for the installation:
              </Text>

              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                }}
              />

              <Text style={styles.label}>Description of Equipment</Text>
              <TextInput
                name="descriptionOfEquipment"
                style={input.textInputLong}
                onChangeText={handleChange('descriptionOfEquipment')}
                onBlur={handleBlur('descriptionOfEquipment')}
                value={values.descriptionOfEquipment}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={styles.label}>Equipment Serial Numbers</Text>
              <TextInput
                name="equipmentSerialNumbers"
                style={input.textInputLong}
                onChangeText={handleChange('equipmentSerialNumbers')}
                onBlur={handleBlur('equipmentSerialNumbers')}
                value={values.equipmentSerialNumbers}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={styles.label}>Comments</Text>
              <TextInput
                name="comments"
                style={input.textInputLong}
                onChangeText={handleChange('comments')}
                onBlur={handleBlur('comments')}
                value={values.comments}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                name="name"
                style={input.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Text style={styles.label}>Date</Text>
              <TextInput
                name="dateRequired"
                style={input.textInput}
                value={currentDate}
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

              <ManageImages
                setImagesArray={setImagesArray}
                imagesArray={imagesArray}
              />

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature}
              />

              <Text style={styles.label}>
                I certify on behalf of the person(s) named above that the items
                described herein have been installed and tested.{' '}
              </Text>

              <Text style={{...styles.label, marginTop: 20}}>
                Authenticating Name
              </Text>
              <TextInput
                name="authenticatingName"
                style={input.textInput}
                onChangeText={handleChange('authenticatingName')}
                onBlur={handleBlur('authenticatingName')}
                value={values.authenticatingName}
              />

              <MySignaturePad
                setScrollEnabled={setScrollEnabled}
                signatureHandler={setSignature2}
              />

              <View style={{alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                  style={!submitting ? input.button : [input.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={submitting}
                  >
                  <Text style={{fontFamily: font.fontFamily, color: 'black'}}>{submitting ? 'Submitting' : 'Submit'}</Text>
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
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
    fontFamily: font.fontFamily,
    color: 'black'
  },
});

export default AntiCollisionSignOffSheetForm;
