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
import {formatDay} from '../../utilities';
import DatePicker from 'react-native-date-picker';
import DropDownYesNoNa from '../../components/form/DropDownYesNoNa';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';

const PostOperationForm = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  // crane from previous form
  const linkID = route.params.linkID;

  const [submitting, setSubmitting] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = formatDay(date);

  const currentDateArray = formattedDate.split('/');
  const finalDate =
    currentDateArray[2] +
    '-' +
    currentDateArray[1] +
    '-' +
    currentDateArray[0] +
    'T00:00:00.000Z';

  const [DDed, setDDed] = useState();
  const [DDtest, setDDtest] = useState();
  const [DDfloodlights, setDDfloodlights] = useState();
  const [DDaviation, setDDaviation] = useState();
  const [DDanemometer, setDDanemometer] = useState();
  const [DDanti, setDDanti] = useState();
  const [DDilluminated, setDDilluminated] = useState();
  const [DDother_items_items, setDDother_items_items] = useState();
  const [DDtest_weights, setDDtest_weights] = useState();
  const [DDouttrigger_mats, setDDouttrigger_mats] = useState();
  const [DDlifting_beam, setDDlifting_beam] = useState();
  const [DDlifting_chains, setDDlifting_chains] = useState();
  const [DDblock_grab, setDDblock_grab] = useState();
  const [DDblock_forks, setDDblock_forks] = useState();
  const [DDgenerator, setDDgenerator] = useState();
  const [DDfuel_tank, setDDfuel_tank] = useState();
  const [DDtemplate, setDDtemplate] = useState();
  const [DDfeet, setDDfeet] = useState();
  const [DDanemometer_items, setDDanemometer_items] = useState();
  const [DDsigns, setDDsigns] = useState();
  const [DDradios, setDDradios] = useState();
  const [DDblokcam, setDDblokcam] = useState();
  const [DDasscorel, setDDasscorel] = useState();
  const [DDother, setDDother] = useState();

  const handleSubmit = async values => {
    const builderData = JSON.stringify({
      ed: DDed,
      ed_reason: values.ed_reason,
      test: DDtest,
      test_reason: values.test_reason,
      floodlights: DDfloodlights,
      floodlights_reason: values.floodlights_reason,
      aviation: DDaviation,
      aviation_reason: values.aviation_reason,
      anemometer: DDanemometer,
      anemometer_reason: values.anemometer_reason,
      anti: DDanti,
      anti_reason: values.anti_reason,
      illuminated: DDilluminated,
      illuminated_reason: values.illuminated_reason,
      other_items_items: DDother_items_items,
      other_items_items_reason: values.other_items_items_reason,
      supervisor: values.supervisor,
      electrician_1: values.electrician_1,
      electrician_2: values.electrician_2,
      test_weights: DDtest_weights,
      test_weights_reason: values.test_weights_reason,
      outtrigger_mats: DDouttrigger_mats,
      outtrigger_mats_reason: values.outtrigger_mats_reason,
      lifting_beam: DDlifting_beam,
      lifting_beam_reason: values.lifting_beam_reason,
      lifting_chains: DDlifting_chains,
      lifting_chains_reason: values.lifting_chains_reason,
      block_grab: DDblock_grab,
      block_grab_reason: values.block_grab_reason,
      block_forks: DDblock_forks,
      block_forks_reason: values.block_forks_reason,
      generator: DDgenerator,
      generator_reason: values.generator_reason,
      fuel_tank: DDfuel_tank,
      fuel_tank_reason: values.fuel_tank_reason,
      template: DDtemplate,
      template_reason: values.template_reason,
      feet: DDfeet,
      feet_reason: values.feet_reason,
      anemometer_items: DDanemometer_items,
      anemometer_items_reason: values.anemometer_items_reason,
      signs: DDsigns,
      signs_reason: values.signs_reason,
      radios: DDradios,
      radios_reason: values.radios_reason,
      blokcam: DDblokcam,
      blokcam_reason: values.blokcam_reason,
      asscorel: DDasscorel,
      asscorel_reason: values.asscorel_reason,
      other: DDother,
      other_comments: values.other_comments,
      formDate: finalDate,
    });

    const requestBody = {
      linkID: linkID,
      formType: 'post_operation',
      builderData,
      selectedPhotos: imagesArray,
    };

    if (
      DDed &&
      DDtest &&
      DDfloodlights &&
      DDaviation &&
      DDanemometer &&
      DDanti &&
      DDilluminated &&
      DDother_items_items &&
      values.supervisor &&
      values.electrician_1 &&
      DDtest_weights &&
      DDouttrigger_mats &&
      DDlifting_beam &&
      DDlifting_chains &&
      DDblock_grab &&
      DDblock_forks &&
      DDgenerator &&
      DDfuel_tank &&
      DDtemplate &&
      DDfeet &&
      DDanemometer_items &&
      DDsigns &&
      DDradios &&
      DDblokcam &&
      DDasscorel &&
      DDother &&
      finalDate
    ) {
      setSubmitting(true);

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
      Alert.alert('Please complete all sections of the form');
    }
  };

  const loginValidationSchema = yup.object().shape({});

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
              <Text style={styles.label}>
                This form MUST be filled in by the Supervisor
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}>
                <View style={styles.listItem}>
                  <Text style={styles.label}>E/D Completed</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDed} />
                  </View>
                </View>

                {DDed == 'NO' ? (
                  <TextInput
                    name="ed_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('ed_reason')}
                    onBlur={handleBlur('ed_reason')}
                    value={values.ed_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Test Completed</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDtest} />
                  </View>
                </View>

                {DDtest == 'NO' ? (
                  <TextInput
                    name="test_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('test_reason')}
                    onBlur={handleBlur('test_reason')}
                    value={values.test_reason}
                    multiline={true}
                  />
                ) : null}
              </View>

              <View style={styles.headerContainerYellow}>
                <Text style={styles.headerText}>ANCILLARIES COMPLETE</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <View style={styles.listItem}>
                  <Text style={styles.label}>Floodlights</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDfloodlights} />
                  </View>
                </View>

                {DDfloodlights == 'NO' || DDfloodlights == 'YES' ? (
                  <TextInput
                    name="floodlights_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('floodlights_reason')}
                    onBlur={handleBlur('floodlights_reason')}
                    value={values.floodlights_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Aviation Lights</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDaviation} />
                  </View>
                </View>

                {DDaviation == 'NO' || DDaviation == 'YES' ? (
                  <TextInput
                    name="aviation_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('aviation_reason')}
                    onBlur={handleBlur('aviation_reason')}
                    value={values.aviation_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Anemometer</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDanemometer} />
                  </View>
                </View>

                {DDanemometer == 'NO' || DDanemometer == 'YES' ? (
                  <TextInput
                    name="anemometer_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('anemometer_reason')}
                    onBlur={handleBlur('anemometer_reason')}
                    value={values.anemometer_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Anti-collision</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDanti} />
                  </View>
                </View>

                {DDanti == 'NO' || DDanti == 'YES' ? (
                  <TextInput
                    name="anti_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('anti_reason')}
                    onBlur={handleBlur('anti_reason')}
                    value={values.anti_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Illuminated sign</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDilluminated} />
                  </View>
                </View>

                {DDilluminated == 'NO' || DDilluminated == 'YES' ? (
                  <TextInput
                    name="illuminated_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('illuminated_reason')}
                    onBlur={handleBlur('illuminated_reason')}
                    value={values.illuminated_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Other items</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa
                      setDropdownYesNoNa={setDDother_items_items}
                    />
                  </View>
                </View>

                {DDother_items_items == 'NO' || DDother_items_items == 'YES' ? (
                  <TextInput
                    name="other_items_items_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('other_items_items_reason')}
                    onBlur={handleBlur('other_items_items_reason')}
                    value={values.other_items_items_reason}
                    multiline={true}
                  />
                ) : null}
              </View>

              <View style={styles.headerContainerYellow}>
                <Text style={styles.headerText}>OPERATION CREW</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <View style={styles.listItem}>
                  <Text style={styles.label}>Supervisor</Text>
                  <TextInput
                    name="supervisor"
                    style={styles.operationCrew}
                    onChangeText={handleChange('supervisor')}
                    onBlur={handleBlur('supervisor')}
                    value={values.supervisor}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View style={styles.listItem}>
                    <Text style={styles.label}>Electrician</Text>
                    <TextInput
                      name="electrician_1"
                      style={styles.operationCrew}
                      onChangeText={handleChange('electrician_1')}
                      onBlur={handleBlur('electrician_1')}
                      value={values.electrician_1}
                    />
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View style={styles.listItem}>
                    <Text style={styles.label}>Electrician</Text>
                    <TextInput
                      name="electrician_2"
                      style={styles.operationCrew}
                      onChangeText={handleChange('electrician_2')}
                      onBlur={handleBlur('electrician_2')}
                      value={values.electrician_2}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.headerContainerYellow}>
                <Text style={styles.headerText}>
                  ITEMS LEFT ON SITE THAT NEED TO BE COLLECTED
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <View style={styles.listItem}>
                  <Text style={styles.label}>Test Weights</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDtest_weights} />
                  </View>
                </View>

                {DDtest_weights == 'NO' || DDtest_weights == 'YES' ? (
                  <TextInput
                    name="test_weights_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('test_weights_reason')}
                    onBlur={handleBlur('test_weights_reason')}
                    value={values.test_weights_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Outrigger mats</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa
                      setDropdownYesNoNa={setDDouttrigger_mats}
                    />
                  </View>
                </View>

                {DDouttrigger_mats == 'NO' || DDouttrigger_mats == 'NO' ? (
                  <TextInput
                    name="outtrigger_mats_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('outtrigger_mats_reason')}
                    onBlur={handleBlur('outtrigger_mats_reason')}
                    value={values.outtrigger_mats_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Lifting beam</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDlifting_beam} />
                  </View>
                </View>

                {DDlifting_beam == 'NO' || DDlifting_beam == 'YES' ? (
                  <TextInput
                    name="lifting_beam_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('lifting_beam_reason')}
                    onBlur={handleBlur('lifting_beam_reason')}
                    value={values.lifting_beam_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Lifting chains</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDlifting_chains} />
                  </View>
                </View>

                {DDlifting_chains == 'NO' || DDlifting_chains == 'YES' ? (
                  <TextInput
                    name="lifting_chains_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('lifting_chains_reason')}
                    onBlur={handleBlur('lifting_chains_reason')}
                    value={values.lifting_chains_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Block grab</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDblock_grab} />
                  </View>
                </View>

                {DDblock_grab == 'NO' || DDblock_grab == 'YES' ? (
                  <TextInput
                    name="block_grab_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('block_grab_reason')}
                    onBlur={handleBlur('block_grab_reason')}
                    value={values.block_grab_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Brick forks</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDblock_forks} />
                  </View>
                </View>

                {DDblock_forks == 'NO' || DDblock_forks == 'YES' ? (
                  <TextInput
                    name="block_forks_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('block_forks_reason')}
                    onBlur={handleBlur('block_forks_reason')}
                    value={values.block_forks_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Generator</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDgenerator} />
                  </View>
                </View>

                {DDgenerator == 'NO' || DDgenerator == 'YES' ? (
                  <TextInput
                    name="generator_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('generator_reason')}
                    onBlur={handleBlur('generator_reason')}
                    value={values.generator_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Fuel Tank</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDfuel_tank} />
                  </View>
                </View>

                {DDfuel_tank == 'NO' || DDfuel_tank == 'YES' ? (
                  <TextInput
                    name="fuel_tank_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('fuel_tank_reason')}
                    onBlur={handleBlur('fuel_tank_reason')}
                    value={values.fuel_tank_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Template</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDtemplate} />
                  </View>
                </View>

                {DDtemplate == 'NO' || DDtemplate == 'YES' ? (
                  <TextInput
                    name="template_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('template_reason')}
                    onBlur={handleBlur('template_reason')}
                    value={values.template_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Feet</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDfeet} />
                  </View>
                </View>

                {DDfeet == 'NO' || DDfeet == 'YES' ? (
                  <TextInput
                    name="feet_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('feet_reason')}
                    onBlur={handleBlur('feet_reason')}
                    value={values.feet_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Anemometer</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa
                      setDropdownYesNoNa={setDDanemometer_items}
                    />
                  </View>
                </View>

                {DDanemometer_items == 'NO' || DDanemometer_items == 'YES' ? (
                  <TextInput
                    name="anemometer_items_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('anemometer_items_reason')}
                    onBlur={handleBlur('anemometer_items_reason')}
                    value={values.anemometer_items_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Sign(s)</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDsigns} />
                  </View>
                </View>

                {DDsigns == 'NO' || DDsigns == 'YES' ? (
                  <TextInput
                    name="signs_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('signs_reason')}
                    onBlur={handleBlur('signs_reason')}
                    value={values.signs_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Radios</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                    <DropDownYesNoNa setDropdownYesNoNa={setDDradios} />
                  </View>
                </View>

                {DDradios == 'NO' || DDradios == 'YES' ? (
                  <TextInput
                    name="radios_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('radios_reason')}
                    onBlur={handleBlur('radios_reason')}
                    value={values.radios_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Blokcam</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                  <DropDownYesNoNa setDropdownYesNoNa={setDDblokcam} />
                  </View>
                </View>

                {DDblokcam == 'NO' || DDblokcam == 'YES' ? (
                  <TextInput
                    name="blokcam_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('blokcam_reason')}
                    onBlur={handleBlur('blokcam_reason')}
                    value={values.blokcam_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Asscorel MS</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                  <DropDownYesNoNa setDropdownYesNoNa={setDDasscorel} />
                  </View>
                </View>

                {DDasscorel == 'NO' || DDasscorel == 'YES' ? (
                  <TextInput
                    name="asscorel_reason"
                    placeholder="Reason"
                    placeholderTextColor={input.placeHolderColor}
                    style={input.textInputLong}
                    onChangeText={handleChange('asscorel_reason')}
                    onBlur={handleBlur('asscorel_reason')}
                    value={values.asscorel_reason}
                    multiline={true}
                  />
                ) : null}

                <View style={styles.listItem}>
                  <Text style={styles.label}>Other items</Text>
                  <View
                    style={{
                      width: '60%',
                      borderWidth: 0.2,
                      borderColor: 'grey',
                      padding: 10,
                      marginLeft: 2,
                    }}>
                  <DropDownYesNoNa setDropdownYesNoNa={setDDother} />
                  </View>
                </View>
              </View>

              {/* {DDother == 'NO' || DDother == 'YES' ? (
                <TextInput
                  name="other_items_items_reason"
                  placeholder="Comments"
                  placeholderTextColor={input.placeHolderColor}
                  style={input.textInputLong}
                  onChangeText={handleChange('other_items_items_reason')}
                  onBlur={handleBlur('other_items_items_reason')}
                  value={values.other_items_items_reason}
                  multiline={true}
                />
              ) : null} */}

              <Text style={styles.label}>Other comments</Text>
              <TextInput
                name="other_comments"
                style={input.textInputLong}
                onChangeText={handleChange('other_comments')}
                onBlur={handleBlur('other_comments')}
                value={values.other_comments}
                multiline={true}
                numberOfLines={5}
              />

              <Text style={styles.label}>Date</Text>
              <TextInput
                name="date"
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

              <ManageImages
                setImagesArray={setImagesArray}
                imagesArray={imagesArray}
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
    // width: '100%',
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
  headerText: {
    color: 'black',
    padding: 3,
    margin: 5,
    width: '100%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 0,
    paddingRight: 50,
    // width: '50%',
  },
  operationCrew: {
    height: 40,
    width: 150,
    margin: 3,
    backgroundColor: '#fff',
    borderColor: '#C8C8C8',
    borderWidth: 0.5,
    // borderRadius: 10,
    paddingLeft: 10,
    fontWeight: '400',
    fontFamily: font.fontFamily,
    justifyContent: 'center',
    color: 'black',
  },
});

export default PostOperationForm;
