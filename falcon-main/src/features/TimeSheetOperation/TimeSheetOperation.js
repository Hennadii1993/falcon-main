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
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';
import DropDown from '../../components/form/DropDown';
import DropDownStanding from '../../components/form/DropDownStanding';

const TimeSheetOperation = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [timeOn, setTimeOn] = useState([]);
  const [timeOnOpen, setTimeOnOpen] = useState(99); // 99 as this isn't a real day
  const [timeOff, setTimeOff] = useState([]);
  const [timeOffOpen, setTimeOffOpen] = useState(99);
  const [meals, setMeals] = useState([]);
  const [standingReason, setStandingReason] = useState([]);
  const [standingReasonOther, setStandingReasonOther] = useState([]);
  const [breakdownReason, setBreakdownReason] = useState([]);

  const [timeActual, setTimeActual] = useState([]);
  const [timeActualOpen, setTimeActualOpen] = useState(99);
  const [timeWorking, setTimeWorking] = useState([]);
  const [timeWorkingOpen, setTimeWorkingOpen] = useState(99);
  const [timeStanding, setTimeStanding] = useState([]);
  const [timeStandingOpen, setTimeStandingOpen] = useState(99);
  const [timeBreakdown, setTimeBreakdown] = useState([]);
  const [timeBreakdownOpen, setTimeBreakdownOpen] = useState(99);
  const [timeTotal, setTimeTotal] = useState([]);
  const [timeTotalOpen, setTimeTotalOpen] = useState(99);

  const [showCopy, setShowCopy] = useState(true);

  const {status, data} = usePostRequest('/api/timesheet', {
    date: route.params.date,
    linkID: route.params.linkID,
  });

  const copyPreviousTimeSheet = async values => {
    const res = await sendRequest('/api/timesheet-recent', User.token, {
      date: route.params.date,
    });

    if(res.beenReset) {
      Alert.alert('Notice', 'Any \'Machine Hours\' figures have been reset to zero for this week')
    }

    const start = [];

    res?.initialStart?.forEach((day, index) => {
      start.push({
        day: index,
        time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
      });
    });

    setTimeOn(start);

    const finish = [];

    res?.initialFinish?.forEach((day, index) => {
      finish.push({
        day: index,
        time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
      });
    });

    setTimeOff(finish);

    const currentMeals = [];

    res?.initialMeals?.forEach((day, index) => {
      currentMeals.push({day: index, meal: day.v ? day.v : ''});
    });

    setMeals(currentMeals);

    const actual = [];

    res?.initialActual?.forEach((day, index) => {
      actual.push({
        day: index,
        time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
      });
    });

    setTimeActual(actual);

    // const working = [];

    // res?.initialWorking?.forEach((day, index) => {
    //   working.push({
    //     day: index,
    //     time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
    //   });
    // });

    // setTimeWorking(working);

    // const standing = [];

    // res?.initialStanding?.forEach((day, index) => {
    //   standing.push({
    //     day: index,
    //     time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
    //   });
    // });

    // setTimeStanding(standing);

    // const breakdown = [];

    // res?.initialBreakdown?.forEach((day, index) => {
    //   breakdown.push({
    //     day: index,
    //     time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
    //   });
    // });

    // setTimeBreakdown(breakdown);

    // const total = [];

    // res?.initialTotal?.forEach((day, index) => {
    //   total.push({
    //     day: index,
    //     time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
    //   });
    // });

    // setTimeTotal(total);

    // const currentSR = [];

    // res?.initialStandingReason?.forEach((day, index) => {
    //   currentSR.push({day: index, standingReason: day.v ? day.v : ''});
    // });

    // setStandingReason(currentSR);

    // const currentSRother = [];

    // res?.initialStandingReasonOther?.forEach((day, index) => {
    //   currentSRother.push({
    //     day: index,
    //     standingReasonOther: day.v ? day.v : '',
    //   });
    // });

    // setStandingReasonOther(currentSRother);

    // const currentBR = [];

    // res?.initialBeakdownReason?.forEach((day, index) => {
    //   currentBR.push({day: index, breakdownReason: day.v ? day.v : ''});
    // });

    // setBreakdownReason(currentBR);

    setShowCopy(false);
  };

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

      const actual = [];

      data?.initialActual?.forEach((day, index) => {
        actual.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeActual(actual);

      const working = [];

      data?.initialWorking?.forEach((day, index) => {
        working.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeWorking(working);

      const standing = [];

      data?.initialStanding?.forEach((day, index) => {
        standing.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeStanding(standing);

      const breakdown = [];

      data?.initialBreakdown?.forEach((day, index) => {
        breakdown.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeBreakdown(breakdown);

      const total = [];

      data?.initialTotal?.forEach((day, index) => {
        total.push({
          day: index,
          time: day.v ? new Date(`2023-01-01T${day.v}:00.000Z`) : defaultTime,
        });
      });

      setTimeTotal(total);

      const currentSR = [];

      data?.initialStandingReason?.forEach((day, index) => {
        currentSR.push({day: index, standingReason: day.v ? day.v : ''});
      });

      setStandingReason(currentSR);

      const currentSRother = [];

      data?.initialStandingReasonOther?.forEach((day, index) => {
        currentSRother.push({
          day: index,
          standingReasonOther: day.v ? day.v : '',
        });
      });

      setStandingReasonOther(currentSRother);

      const currentBR = [];

      data?.initialBeakdownReason?.forEach((day, index) => {
        currentBR.push({day: index, breakdownReason: day.v ? day.v : ''});
      });

      setBreakdownReason(currentBR);
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

  function selectActualTime(key, time) {
    const alreadyExists =
      timeActual.length && timeActual.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeActual([newTime, ...timeActual]);
    } else {
      const timesWithoutThisDay = timeActual.filter(times => times.day != key);
      setTimeActual([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectWorkingTime(key, time) {
    const alreadyExists =
      timeWorking.length &&
      timeWorking.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeWorking([newTime, ...timeWorking]);
    } else {
      const timesWithoutThisDay = timeWorking.filter(times => times.day != key);
      setTimeWorking([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectStandingTime(key, time) {
    const alreadyExists =
      timeStanding.length &&
      timeStanding.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeStanding([newTime, ...timeStanding]);
    } else {
      const timesWithoutThisDay = timeStanding.filter(
        times => times.day != key,
      );
      setTimeStanding([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectBreakdownTime(key, time) {
    const alreadyExists =
      timeBreakdown.length &&
      timeBreakdown.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeBreakdown([newTime, ...timeBreakdown]);
    } else {
      const timesWithoutThisDay = timeBreakdown.filter(
        times => times.day != key,
      );
      setTimeBreakdown([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectStandingReason(key, value) {
    const alreadyExists =
      standingReason.length && standingReason.filter(x => x.day == key).length;
    const newSR = {day: key, standingReason: value};

    if (!alreadyExists) {
      setStandingReason([newSR, ...standingReason]);
    } else {
      const SRWithoutThisDay = standingReason.filter(x => x.day != key);
      setStandingReason([newSR, ...SRWithoutThisDay]);
    }
  }

  function selectTotalTime(key, time) {
    const alreadyExists =
      timeTotal.length && timeTotal.filter(times => times.day == key).length;
    const newTime = {day: key, time: new Date(time)};

    if (!alreadyExists) {
      setTimeTotal([newTime, ...timeTotal]);
    } else {
      const timesWithoutThisDay = timeTotal.filter(times => times.day != key);
      setTimeTotal([newTime, ...timesWithoutThisDay]);
    }
  }

  function selectStandingReasonOther(key, value) {
    const alreadyExists =
      standingReasonOther.length &&
      standingReasonOther.filter(x => x.day == key).length;
    const newStandingReasonOther = {day: key, standingReasonOther: value};

    if (!alreadyExists) {
      setStandingReasonOther([newStandingReasonOther, ...standingReasonOther]);
    } else {
      const standingReasonOtherWithoutThisDay = standingReasonOther.filter(
        x => x.day != key,
      );
      setStandingReasonOther([
        newStandingReasonOther,
        ...standingReasonOtherWithoutThisDay,
      ]);
    }
  }

  function selectBreakdownReason(key, value) {
    const alreadyExists =
      breakdownReason.length &&
      breakdownReason.filter(x => x.day == key).length;
    const newBreakdown = {day: key, breakdownReason: value};

    if (!alreadyExists) {
      setBreakdownReason([newBreakdown, ...breakdownReason]);
    } else {
      const breakdownWithoutThisDay = breakdownReason.filter(x => x.day != key);
      setBreakdownReason([newBreakdown, ...breakdownWithoutThisDay]);
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
        timeActual.filter(times => times.day == 0).length
          ? formatTime(timeActual.find(times => times.day == 0).time)
          : null,
        timeWorking.filter(times => times.day == 0).length
          ? formatTime(timeWorking.find(times => times.day == 0).time)
          : null,
        timeStanding.filter(times => times.day == 0).length
          ? formatTime(timeStanding.find(times => times.day == 0).time)
          : null,
        timeBreakdown.filter(times => times.day == 0).length
          ? formatTime(timeBreakdown.find(times => times.day == 0).time)
          : null,
        timeTotal.filter(times => times.day == 0).length
          ? formatTime(timeTotal.find(times => times.day == 0).time)
          : null,
        standingReason.filter(m => m.day == 0).length
          ? standingReason.find(m => m.day == 0).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 0).length
          ? standingReasonOther.find(m => m.day == 0).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 0).length
          ? breakdownReason.find(m => m.day == 0).breakdownReason
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
        timeActual.filter(times => times.day == 1).length
          ? formatTime(timeActual.find(times => times.day == 1).time)
          : null,
        timeWorking.filter(times => times.day == 1).length
          ? formatTime(timeWorking.find(times => times.day == 1).time)
          : null,
        timeStanding.filter(times => times.day == 1).length
          ? formatTime(timeStanding.find(times => times.day == 1).time)
          : null,
        timeBreakdown.filter(times => times.day == 1).length
          ? formatTime(timeBreakdown.find(times => times.day == 1).time)
          : null,
        timeTotal.filter(times => times.day == 1).length
          ? formatTime(timeTotal.find(times => times.day == 1).time)
          : null,
        standingReason.filter(m => m.day == 1).length
          ? standingReason.find(m => m.day == 1).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 1).length
          ? standingReasonOther.find(m => m.day == 1).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 1).length
          ? breakdownReason.find(m => m.day == 1).breakdownReason
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
        timeActual.filter(times => times.day == 2).length
          ? formatTime(timeActual.find(times => times.day == 2).time)
          : null,
        timeWorking.filter(times => times.day == 2).length
          ? formatTime(timeWorking.find(times => times.day == 2).time)
          : null,
        timeStanding.filter(times => times.day == 2).length
          ? formatTime(timeStanding.find(times => times.day == 2).time)
          : null,
        timeBreakdown.filter(times => times.day == 2).length
          ? formatTime(timeBreakdown.find(times => times.day == 2).time)
          : null,
        timeTotal.filter(times => times.day == 2).length
          ? formatTime(timeTotal.find(times => times.day == 2).time)
          : null,
        standingReason.filter(m => m.day == 2).length
          ? standingReason.find(m => m.day == 2).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 2).length
          ? standingReasonOther.find(m => m.day == 2).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 2).length
          ? breakdownReason.find(m => m.day == 2).breakdownReason
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
        timeActual.filter(times => times.day == 3).length
          ? formatTime(timeActual.find(times => times.day == 3).time)
          : null,
        timeWorking.filter(times => times.day == 3).length
          ? formatTime(timeWorking.find(times => times.day == 3).time)
          : null,
        timeStanding.filter(times => times.day == 3).length
          ? formatTime(timeStanding.find(times => times.day == 3).time)
          : null,
        timeBreakdown.filter(times => times.day == 3).length
          ? formatTime(timeBreakdown.find(times => times.day == 3).time)
          : null,
        timeTotal.filter(times => times.day == 3).length
          ? formatTime(timeTotal.find(times => times.day == 3).time)
          : null,
        standingReason.filter(m => m.day == 3).length
          ? standingReason.find(m => m.day == 3).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 3).length
          ? standingReasonOther.find(m => m.day == 3).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 3).length
          ? breakdownReason.find(m => m.day == 3).breakdownReason
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
        timeActual.filter(times => times.day == 4).length
          ? formatTime(timeActual.find(times => times.day == 4).time)
          : null,
        timeWorking.filter(times => times.day == 4).length
          ? formatTime(timeWorking.find(times => times.day == 4).time)
          : null,
        timeStanding.filter(times => times.day == 4).length
          ? formatTime(timeStanding.find(times => times.day == 4).time)
          : null,
        timeBreakdown.filter(times => times.day == 4).length
          ? formatTime(timeBreakdown.find(times => times.day == 4).time)
          : null,
        timeTotal.filter(times => times.day == 4).length
          ? formatTime(timeTotal.find(times => times.day == 4).time)
          : null,
        standingReason.filter(m => m.day == 4).length
          ? standingReason.find(m => m.day == 4).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 4).length
          ? standingReasonOther.find(m => m.day == 4).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 4).length
          ? breakdownReason.find(m => m.day == 4).breakdownReason
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
        timeActual.filter(times => times.day == 5).length
          ? formatTime(timeActual.find(times => times.day == 5).time)
          : null,
        timeWorking.filter(times => times.day == 5).length
          ? formatTime(timeWorking.find(times => times.day == 5).time)
          : null,
        timeStanding.filter(times => times.day == 5).length
          ? formatTime(timeStanding.find(times => times.day == 5).time)
          : null,
        timeBreakdown.filter(times => times.day == 5).length
          ? formatTime(timeBreakdown.find(times => times.day == 5).time)
          : null,
        timeTotal.filter(times => times.day == 5).length
          ? formatTime(timeTotal.find(times => times.day == 5).time)
          : null,
        standingReason.filter(m => m.day == 5).length
          ? standingReason.find(m => m.day == 5).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 5).length
          ? standingReasonOther.find(m => m.day == 5).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 5).length
          ? breakdownReason.find(m => m.day == 5).breakdownReason
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
        timeActual.filter(times => times.day == 6).length
          ? formatTime(timeActual.find(times => times.day == 6).time)
          : null,
        timeWorking.filter(times => times.day == 6).length
          ? formatTime(timeWorking.find(times => times.day == 6).time)
          : null,
        timeStanding.filter(times => times.day == 6).length
          ? formatTime(timeStanding.find(times => times.day == 6).time)
          : null,
        timeBreakdown.filter(times => times.day == 6).length
          ? formatTime(timeBreakdown.find(times => times.day == 6).time)
          : null,
        timeTotal.filter(times => times.day == 6).length
          ? formatTime(timeTotal.find(times => times.day == 6).time)
          : null,
        standingReason.filter(m => m.day == 6).length
          ? standingReason.find(m => m.day == 6).standingReason
          : null,
        standingReasonOther.filter(m => m.day == 6).length
          ? standingReasonOther.find(m => m.day == 6).standingReasonOther
          : null,
        breakdownReason.filter(m => m.day == 6).length
          ? breakdownReason.find(m => m.day == 6).breakdownReason
          : null,
      ],
    ]);

    const requestBody = {
      date: route.params.date,
      linkID: route.params.linkID,
      timesheetData,
    };

    const res = await sendRequest(
      '/api/timesheet-save',
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
          {showCopy ? (
            <View style={{alignItems: 'center', marginBottom: 5, width: '95%'}}>
              <TouchableOpacity
                style={{
                  ...input.button,
                  backgroundColor: 'white',
                  borderColor: '#fdc73e',
                  borderWidth: 1,
                  width: '100%',
                }}
                onPress={() => copyPreviousTimeSheet()}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontWeight: '500',
                    color: '#fdc73e',
                  }}>
                  Copy previous timesheet
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

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
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          textAlign: 'left',
                          padding: 5,
                          marginTop: 5,
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          fontSize: 16,
                          color: 'grey',
                        }}>
                        OPERATOR HOURS
                      </Text>
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
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Start
                        </Text>
                        <TextInput
                          name="timeOn"
                          style={{...styles.timeInput}}
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
                          padding: 10,
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Finish
                        </Text>
                        <TextInput
                          name="timeOffSite"
                          style={{...styles.timeInput}}
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

                      <View
                        style={{
                          display: 'flex',
                          padding: 10,
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Meals
                        </Text>

                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 5,
                            borderWidth: 0.3,
                            borderColor: 'grey',
                            padding: 2,
                            width: 72,
                            paddingTop: 20,
                            paddingBottom: 20,
                            paddingLeft: 10,
                            height: 60
                          }}>
                          <DropDownMealsNew
                            selectMeals={selectMeals}
                            id={key}
                            style={{borderColor: 'red', borderWidth: 1}}
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
                          padding: 10,
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Actual
                        </Text>
                        <TextInput
                          name="timeActual"
                          style={{...styles.timeInput}}
                          value={
                            timeActual.length &&
                            timeActual.filter(times => times.day == key).length
                              ? formatTime(
                                  timeActual.find(times => times.day == key)
                                    .time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeActualOpen(key)}
                        />
                        <DatePicker
                          name="timeActualOpen"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeActualOpen == key}
                          date={
                            timeActual.length &&
                            timeActual.filter(times => times.day == key).length
                              ? timeActual.find(times => times.day == key).time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeActualOpen(99);
                            selectActualTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeActualOpen(99);
                          }}
                        />
                      </View>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          textAlign: 'left',
                          padding: 5,
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          fontSize: 16,
                          color: 'grey',
                        }}>
                        MACHINE HOURS
                      </Text>
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
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Working
                        </Text>
                        <TextInput
                          name="timeWorking"
                          style={{...styles.timeInput}}
                          value={
                            timeWorking.length &&
                            timeWorking.filter(times => times.day == key).length
                              ? formatTime(
                                  timeWorking.find(times => times.day == key)
                                    .time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeWorkingOpen(key)}
                        />
                        <DatePicker
                          name="timeWorking"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeWorkingOpen == key}
                          date={
                            timeWorking.length &&
                            timeWorking.filter(times => times.day == key).length
                              ? timeWorking.find(times => times.day == key).time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeWorkingOpen(99);
                            selectWorkingTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeWorkingOpen(99);
                          }}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: 10,
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Standing
                        </Text>
                        <TextInput
                          name="timeStanding"
                          style={{...styles.timeInput}}
                          value={
                            timeStanding.length &&
                            timeStanding.filter(times => times.day == key)
                              .length
                              ? formatTime(
                                  timeStanding.find(times => times.day == key)
                                    .time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeStandingOpen(key)}
                        />
                        <DatePicker
                          name="timeStandingOpen"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeStandingOpen == key}
                          date={
                            timeStanding.length &&
                            timeStanding.filter(times => times.day == key)
                              .length
                              ? timeStanding.find(times => times.day == key)
                                  .time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeStandingOpen(99);
                            selectStandingTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeStandingOpen(99);
                          }}
                        />
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: 10,
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center', fontSize: 13}}>
                          Breakdown
                        </Text>
                        <TextInput
                          name="timeBreakdown"
                          style={{...styles.timeInput}}
                          value={
                            timeBreakdown.length &&
                            timeBreakdown.filter(times => times.day == key)
                              .length
                              ? formatTime(
                                  timeBreakdown.find(times => times.day == key)
                                    .time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeBreakdownOpen(key)}
                        />
                        <DatePicker
                          name="timeBreakdownOpen"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeBreakdownOpen == key}
                          date={
                            timeBreakdown.length &&
                            timeBreakdown.filter(times => times.day == key)
                              .length
                              ? timeBreakdown.find(times => times.day == key)
                                  .time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeBreakdownOpen(99);
                            selectBreakdownTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeBreakdownOpen(99);
                          }}
                        />
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: 10,
                          width: '25%',
                        }}>
                        <Text style={{...styles.label, textAlign: 'center'}}>
                          Total
                        </Text>
                        <TextInput
                          name="timeTotal"
                          style={{...styles.timeInput}}
                          value={
                            timeTotal.length &&
                            timeTotal.filter(times => times.day == key).length
                              ? formatTime(
                                  timeTotal.find(times => times.day == key)
                                    .time,
                                )
                              : '00:00'
                          }
                          onFocus={() => setTimeTotalOpen(key)}
                        />
                        <DatePicker
                          name="timeTotalOpen"
                          modal
                          locale={'en_GB'}
                          mode="time"
                          open={timeTotalOpen == key}
                          date={
                            timeTotal.length &&
                            timeTotal.filter(times => times.day == key).length
                              ? timeTotal.find(times => times.day == key).time
                              : new Date('2023-01-01T00:00:00.000Z')
                          }
                          onConfirm={time => {
                            setTimeTotalOpen(99);
                            selectTotalTime(key, time);
                          }}
                          onCancel={() => {
                            setTimeTotalOpen(99);
                          }}
                        />
                      </View>
                    </View>

                    {String(timeStanding.find(x => x.day === key).time) !=
                    String('Sun Jan 01 2023 00:00:00 GMT+0000') ? (
                      <>
                        <Text
                          style={{
                            ...styles.label,
                            textAlign: 'center',
                            color: 'red',
                            fontWeight: '400',
                            marginBottom: 5,
                          }}>
                          Why was the crane standing?
                        </Text>
                        <View
                          style={{
                            padding: 10,
                            width: '95%',
                            borderColor: 'grey',
                            height: 30,
                            borderWidth: 0.3,
                            textAlign: 'center',
                            // marginBottom: 5,
                          }}>
                          <DropDownStanding
                            selectStandingReason={selectStandingReason}
                            id={key}
                            style={{borderColor: 'red', borderWidth: 1}}
                            value={
                              standingReason.length
                                ? standingReason.find(times => times.day == key)
                                : ''
                            }
                          />
                        </View>
                      </>
                    ) : null}

                    {standingReason?.find(x => x.day === key).standingReason &&
                    standingReason?.find(x => x.day === key).standingReason ==
                      String('Other') ? (
                      <>
                        <Text
                          style={{
                            ...styles.label,
                            textAlign: 'center',
                            color: 'red',
                            fontWeight: '400',
                            marginBottom: -10,
                            marginTop: 10,
                          }}>
                          Enter the reason
                        </Text>
                        <View
                          style={{
                            padding: 10,
                            width: '100%',
                          }}>
                          <TextInput
                            name={`standingOther${key}`}
                            onChangeText={value => {
                              selectStandingReasonOther(key, value);
                            }}
                            value={
                              standingReasonOther.length &&
                              standingReasonOther.filter(
                                times => times.day == key,
                              ).length
                                ? standingReasonOther.find(
                                    times => times.day == key,
                                  ).standingReasonOther
                                : ''
                            }
                            style={input.textInputWorkCarriedOut}
                            multiline={true}
                          />
                        </View>
                      </>
                    ) : null}

                    {/* <Text>{String(timeBreakdown.find(x => x.day === 0).time)}</Text> */}

                    {String(timeBreakdown.find(x => x.day === key).time) !=
                    String('Sun Jan 01 2023 00:00:00 GMT+0000') ? (
                      <>
                        <Text
                          style={{
                            ...styles.label,
                            textAlign: 'center',
                            color: 'red',
                            fontWeight: '400',
                            marginBottom: -10,
                          }}>
                          What was the reason for the breakdown?
                        </Text>
                        <View
                          style={{
                            padding: 10,
                            width: '100%',
                          }}>
                          <TextInput
                            name={`breakdown${key}`}
                            onChangeText={value => {
                              selectBreakdownReason(key, value);
                            }}
                            value={
                              breakdownReason.length &&
                              breakdownReason.filter(times => times.day == key)
                                .length
                                ? breakdownReason.find(
                                    times => times.day == key,
                                  ).breakdownReason
                                : ''
                            }
                            style={input.textInputWorkCarriedOut}
                            multiline={true}
                          />
                        </View>
                      </>
                    ) : null}
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
    fontSize: 14,
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
    width: '100%',
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

export default TimeSheetOperation;
