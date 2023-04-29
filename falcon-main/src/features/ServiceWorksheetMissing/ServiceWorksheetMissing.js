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
import CheckBox from '@react-native-community/checkbox';
import {usePostRequest} from '../../client';

const ServiceWorksheetMissing = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [reason, setReason] = useState({});
  const [repair, setRepair] = useState({});
  const [completed, setCompleted] = useState({});

  const [defects, setDefects] = useState({});

  function selectReason(key, value) {
    setReason({
      ...reason,
      [key]: value,
    });
  }

  function selectRepair(key, value) {
    setRepair({
      ...repair,
      [key]: value,
    });
  }

  function selectCompleted(key, value) {
    setCompleted({
      ...completed,
      [key]: value,
    });
  }

  const linkID = route.params.linkID;
  const jobs = route.params.jobs;

  const {status, data} = usePostRequest(
    '/api/service-worksheet-options-missing',
    {
      linkID: linkID,
      jobs: jobs.join(','),
    },
  );

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const currentDate = formatDay(date);

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  const [signature, setSignature] = useState(false);

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

  function defectsObject(id, letter) {
    setDefects({
      ...defects,
      [id]: letter,
    });
  }

  const handleSubmit = async values => {
    setSubmitting(true);

    const builderData = JSON.stringify({
      jobs: jobs,
      missing: data.missing,
      defects: defects,
      reasons: reason,
      repair: repair,
      completed: completed,
      name: values.name,
      parts: values.parts,
      formDate: formattedDate,
      furtherWorkRequired: toggleCheckBox,
      furtherWork: values.furtherWork,
    });

    const requestBody = {
      linkID: linkID,
      formType: 'service_worksheets',
      builderData,
      signature,
      selectedPhotos: imagesArray,
    };

    if (signature.length > 0) {
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

  if (status == 'fetched') {
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
                {data.missing.length > 0 ? (
                  <View style={{marginBottom: 10}}>
                    <Text style={styles.label}>
                      {data?.missing?.length} job(s) need further attention
                    </Text>
                  </View>
                ) : null}

                {/* <Text>{JSON.stringify(reason)}</Text>
                <Text>{JSON.stringify(repair)}</Text>
                <Text>{JSON.stringify(completed)}</Text> */}

                {data.missing.map((item, key) => (
                  <>
                    <View style={{backgroundColor: '#fdc73e', width: '100%'}}>
                      <Text style={styles.label}>
                        {item.id} - {item.name}
                      </Text>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          paddingTop: 5,
                        }}>
                        <Text style={styles.label}>
                          A - Safety related repair required
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
                          value={defects[item.id] === 'A' ? true : false}
                          onValueChange={() => defectsObject(item.id, 'A')}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          paddingTop: 5,
                        }}>
                        <Text style={styles.label}>
                          B - General repair recommended
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
                          value={defects[item.id] === 'B' ? true : false}
                          onValueChange={() => defectsObject(item.id, 'B')}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          paddingTop: 5,
                        }}>
                        <Text style={styles.label}>
                          O - Observe condition or performance
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
                          value={defects[item.id] === 'O' ? true : false}
                          onValueChange={() => defectsObject(item.id, 'O')}
                        />
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '90%',
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}>
                        <Text style={styles.label}>N/A - Not applicable</Text>
                        <CheckBox
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          tintColor="orange"
                          onCheckColor="green"
                          onTintColor="green"
                          tintColors={{ true: 'green', false: 'grey' }}
                          value={defects[item.id] === 'N' ? true : false}
                          onValueChange={() => defectsObject(item.id, 'N')}
                        />
                      </View>
                    </View>

                    {defects[item.id] === 'A' ||
                    defects[item.id] === 'B' ||
                    defects[item.id] === 'O' ? (
                      <>
                        <TextInput
                          name={`reason${item.id}`}
                          placeholder="Item fault description"
                          onChangeText={value => {
                            selectReason(item.id, value);
                          }}
                          multiline={true}
                          numberOfLines={5}
                          style={input.textInputWorkCarriedOut}
                        />

                        <TextInput
                          name={`repair${key}`}
                          placeholder="Repair description"
                          onChangeText={value => {
                            selectRepair(item.id, value);
                          }}
                          multiline={true}
                          numberOfLines={5}
                          style={input.textInputWorkCarriedOut}
                        />

                        <TextInput
                          name={`completed${key}`}
                          placeholder="Repair completed technician details"
                          onChangeText={value => {
                            selectCompleted(item.id, value);
                          }}
                          multiline={true}
                          numberOfLines={5}
                          style={input.textInputWorkCarriedOut}
                        />
                      </>
                    ) : null}
                  </>
                ))}

                <ManageImages
                  setImagesArray={setImagesArray}
                  imagesArray={imagesArray}
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
                      tintColors={{ true: 'green', false: 'grey' }}
                      value={toggleCheckBox}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                    />
                  </View>
                </View>

                {toggleCheckBox ? (
                  <>
                    <Text style={styles.label}>Further work</Text>
                    <TextInput
                      name="furtherWork"
                      style={input.textInputLong}
                      onChangeText={handleChange('furtherWork')}
                      onBlur={handleBlur('furtherWork')}
                      value={values.furtherWork}
                      multiline={true}
                      numberOfLines={5}
                    />
                  </>
                ) : null}

                <Text style={styles.label}>Parts required</Text>
                <TextInput
                  name="parts"
                  style={input.textInputLong}
                  onChangeText={handleChange('parts')}
                  onBlur={handleBlur('parts')}
                  value={values.parts}
                  multiline={true}
                  numberOfLines={5}
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

                <Text style={styles.label}>Your Name</Text>
                <TextInput
                  name="name"
                  style={input.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />

                <MySignaturePad
                  setScrollEnabled={setScrollEnabled}
                  signatureHandler={setSignature}
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
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
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

export default ServiceWorksheetMissing;
