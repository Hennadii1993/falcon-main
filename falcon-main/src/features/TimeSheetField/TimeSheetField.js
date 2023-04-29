import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef, useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import {colours, font, input} from '../../config';
import {formatTime} from '../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownMealsNew from '../../components/form/DropDownMealsNew';
import DropDownYesNo from '../../components/form/DropDownYesNo';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';

const TimeSheetField = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [timeOn, setTimeOn] = useState([]);
  const [timeOnOpen, setTimeOnOpen] = useState(99); // 99 as this isn't a real day
  const [timeOff, setTimeOff] = useState([]);
  const [timeOffOpen, setTimeOffOpen] = useState(99);
  const [meals, setMeals] = useState([]);
  const [night, setNight] = useState([]);
  const [work, setWork] = useState([]);

  const {status, data} = usePostRequest('/api/timesheet-field', {
    date: route.params.date,
  });

  const defaultTime = new Date(`2023-01-01T00:00:00.000Z`);

  useEffect(() => {
    if (data) {
      const start = [];

      data?.initialStart?.forEach((day, index) => {
        start.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeOn(start);

      const finish = [];

      data?.initialFinish?.forEach((day, index) => {
        finish.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeOff(finish);

      const currentMeals = [];

      data?.initialMeals?.forEach((day, index) => {
        currentMeals.push({day: index, meal: day.v ? day.v : ''});
      });

      setMeals(currentMeals);

      const currentNights = [];

      data?.initialNightout?.forEach((day, index) => {
        currentNights.push({day: index, night: day.v ? day.v : ''});
      });

      setNight(currentNights);

      const currentWork = [];

      data?.initialWork?.forEach((day, index) => {
        currentWork.push({day: index, work: day.v ? day.v : ''});
      });

      setWork(currentWork);
    }
  }, [data]);

  const [submitting, setSubmitting] = useState(false);

  function selectOnTime(key, time) {
    const alreadyExists =
      timeOn.length && timeOn.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeOn([newTime, ...timeOn]);
    } else {
      const timesWithoutThisDay = timeOn.filter(times => times.day != key);
      setTimeOn([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectOffTime(key, time) {
    const alreadyExists =
      timeOff.length && timeOff.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeOff([newTime, ...timeOff]);
    } else {
      const timesWithoutThisDay = timeOff.filter(times => times.day != key);
      setTimeOff([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectMeals(key, value) {
    const alreadyExists =
      meals.length && meals.filter(x => x.day == key).length;
    const newMeal = {day: key, meal: value};

    if (!alreadyExists) {
      setMeals([newMeal, ...meals]);
    } else {
      const mealsWithoutThisDay = meals.filter(x => x.day != key);
      setMeals([newMeal, ...mealsWithoutThisDay]);
    }
  }

  function selectNight(key, value) {
    const alreadyExists =
      night.length && night.filter(x => x.day == key).length;
    const newNight = {day: key, night: value};

    if (!alreadyExists) {
      setNight([newNight, ...night]);
    } else {
      const nightsWithoutThisDay = night.filter(x => x.day != key);
      setNight([newNight, ...nightsWithoutThisDay]);
    }
  }

  function selectWork(key, value) {
    const alreadyExists = work.length && work.filter(x => x.day == key).length;
    const newWork = {day: key, work: value};

    if (!alreadyExists) {
      setWork([newWork, ...work]);
    } else {
      const workWithoutThisDay = work.filter(x => x.day != key);
      setWork([newWork, ...workWithoutThisDay]);
    }
  }

  const handleSubmit = async values => {
    setSubmitting(true);

    const timesheetData = JSON.stringify([
      [
        timeOn.filter(times => times.day == 0).length
          ? formatTime(timeOn.find(times => times.day == 0).time)
          : null,
        timeOff.filter(times => times.day == 0).length
          ? formatTime(timeOff.find(times => times.day == 0).time)
          : null,
        meals.filter(m => m.day == 0).length
          ? meals.find(m => m.day == 0).meal
          : null,
        night.filter(n => n.day == 0).length
          ? night.find(n => n.day == 0).night
          : null,
        work.filter(n => n.day == 0).length
          ? work.find(n => n.day == 0).work
          : null,
      ],
      [
        timeOn.filter(times => times.day == 1).length
          ? formatTime(timeOn.find(times => times.day == 1).time)
          : null,
        timeOff.filter(times => times.day == 1).length
          ? formatTime(timeOff.find(times => times.day == 1).time)
          : null,
        meals.filter(m => m.day == 1).length
          ? meals.find(m => m.day == 1).meal
          : null,
        night.filter(n => n.day == 1).length
          ? night.find(n => n.day == 1).night
          : null,
        work.filter(n => n.day == 1).length
          ? work.find(n => n.day == 1).work
          : null,
      ],
      [
        timeOn.filter(times => times.day == 2).length
          ? formatTime(timeOn.find(times => times.day == 2).time)
          : null,
        timeOff.filter(times => times.day == 2).length
          ? formatTime(timeOff.find(times => times.day == 2).time)
          : null,
        meals.filter(m => m.day == 2).length
          ? meals.find(m => m.day == 2).meal
          : null,
        night.filter(n => n.day == 2).length
          ? night.find(n => n.day == 2).night
          : null,
        work.filter(n => n.day == 2).length
          ? work.find(n => n.day == 2).work
          : null,
      ],
      [
        timeOn.filter(times => times.day == 3).length
          ? formatTime(timeOn.find(times => times.day == 3).time)
          : null,
        timeOff.filter(times => times.day == 3).length
          ? formatTime(timeOff.find(times => times.day == 3).time)
          : null,
        meals.filter(m => m.day == 3).length
          ? meals.find(m => m.day == 3).meal
          : null,
        night.filter(n => n.day == 3).length
          ? night.find(n => n.day == 3).night
          : null,
        work.filter(n => n.day == 3).length
          ? work.find(n => n.day == 3).work
          : null,
      ],
      [
        timeOn.filter(times => times.day == 4).length
          ? formatTime(timeOn.find(times => times.day == 4).time)
          : null,
        timeOff.filter(times => times.day == 4).length
          ? formatTime(timeOff.find(times => times.day == 4).time)
          : null,
        meals.filter(m => m.day == 4).length
          ? meals.find(m => m.day == 4).meal
          : null,
        night.filter(n => n.day == 4).length
          ? night.find(n => n.day == 4).night
          : null,
        work.filter(n => n.day == 4).length
          ? work.find(n => n.day == 4).work
          : null,
      ],
      [
        timeOn.filter(times => times.day == 5).length
          ? formatTime(timeOn.find(times => times.day == 5).time)
          : null,
        timeOff.filter(times => times.day == 5).length
          ? formatTime(timeOff.find(times => times.day == 5).time)
          : null,
        meals.filter(m => m.day == 5).length
          ? meals.find(m => m.day == 5).meal
          : null,
        night.filter(n => n.day == 5).length
          ? night.find(n => n.day == 5).night
          : null,
        work.filter(n => n.day == 5).length
          ? work.find(n => n.day == 5).work
          : null,
      ],
      [
        timeOn.filter(times => times.day == 6).length
          ? formatTime(timeOn.find(times => times.day == 6).time)
          : null,
        timeOff.filter(times => times.day == 6).length
          ? formatTime(timeOff.find(times => times.day == 6).time)
          : null,
        meals.filter(m => m.day == 6).length
          ? meals.find(m => m.day == 6).meal
          : null,
        night.filter(n => n.day == 6).length
          ? night.find(n => n.day == 6).night
          : null,
        work.filter(n => n.day == 6).length
          ? work.find(n => n.day == 6).work
          : null,
      ],
    ]);

    const requestBody = {
      date: route.params.date,
      timesheetData,
    };

    const res = await sendRequest(
      '/api/timesheet-save-field',
      User.token,
      requestBody,
    );

    Alert.alert(
      'Done',
      'Timesheet saved',
      [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
      {cancelable: false},
    );
  };

  const loginValidationSchema = yup.object().shape({});

  if (status == 'fetched') {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{}}
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
                {data.dates.map((day, key) => (
                  <>
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerText}>{day.dateFormatted}</Text>
                    </View>

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
                          marginLeft: 5,
                          marginRight: 5,
                          width: '30%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Start
                        </Text>
                        <TextInput
                          name="timeOn"
                          style={{...styles.timeInput, paddingLeft: 25}}
                          value={
                            timeOn.length &&
                            timeOn.filter(times => times.day == key).length
                              ? formatTime(
                                  timeOn.find(times => times.day == key).time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeOnOpen(key)}
                        />
                        <DatePicker
                          name="timeOnOpen"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeOnOpen == key}
                          date={
                            timeOn.length &&
                            timeOn.filter(times => times.day == key).length
                              ? timeOn.find(times => times.day == key).time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeOnOpen(99);
                            selectOnTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeOnOpen(99);
                          }}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: 5,
                          marginRight: 5,
                          padding: 10,
                          width: '30%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Finish
                        </Text>
                        <TextInput
                          name="timeOffSite"
                          style={{...styles.timeInput, paddingLeft: 25}}
                          value={
                            timeOff.length &&
                            timeOff.filter(times => times.day == key).length
                              ? formatTime(
                                  timeOff.find(times => times.day == key).time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeOffOpen(key)}
                        />
                        <DatePicker
                          name="timeOffOpen"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeOffOpen == key}
                          date={
                            timeOff.length &&
                            timeOff.filter(times => times.day == key).length
                              ? timeOff.find(times => times.day == key).time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeOffOpen(99);
                            selectOffTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeOffOpen(99);
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          padding: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          width: '45%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Meals
                        </Text>
                        <View
                          style={{
                            paddingLeft: 26,
                            borderColor: '#C8C8C8',
                            borderWidth: 0.5,
                            padding: 10,
                          }}>
                          <DropDownMealsNew
                            selectMeals={selectMeals}
                            id={key}
                            value={
                              meals.length
                                ? meals.find(times => times.day == key)
                                : ''
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          width: '45%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Night Out
                        </Text>
                        <View
                          style={{
                            paddingLeft: 25,
                            borderColor: '#C8C8C8',
                            borderWidth: 0.5,
                            padding: 10,
                          }}>
                          <DropDownYesNo
                            selectNight={selectNight}
                            id={key}
                            value={
                              night.length
                                ? night.find(times => times.day == key)
                                : ''
                            }
                          />
                        </View>
                      </View>
                    </View>

                    <Text style={{...styles.label, textAlign: 'center'}}>
                      Work Carried Out
                    </Text>
                    <TextInput
                      name={`work${key}`}
                      onChangeText={value => {
                        selectWork(key, value);
                      }}
                      value={
                        work.length &&
                        work.filter(times => times.day == key).length
                          ? work.find(times => times.day == key).work
                          : ''
                      }
                      multiline={true}
                      numberOfLines={5}
                      style={input.textInputWorkCarriedOut}
                    />
                  </>
                ))}

                <View style={{alignItems: 'center', marginBottom: 30}}>
                  <TouchableOpacity
                    style={!submitting ? input.button : [input.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={submitting}>
                    <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                      {submitting ? 'Saving' : 'Save'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
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
    fontSize: 15,
    fontWeight: '300',
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
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
  headerContainer: {
    backgroundColor: '#e5e5e5',
    marginTop: 6,
    width: '100%',
  },
  headerText: {
    color: 'black',
    padding: 3,
    margin: 5,
    width: '100%',
  },
  timeInput: {
    height: 60,
    width: 80,
    margin: 3,
    backgroundColor: '#fff',
    borderColor: '#C8C8C8',
    borderWidth: 0.5,
    paddingLeft: 20,
    fontWeight: '400',
    fontFamily: font.fontFamily,
    justifyContent: 'center',
    color: 'black',
  },
});

export default TimeSheetField;
