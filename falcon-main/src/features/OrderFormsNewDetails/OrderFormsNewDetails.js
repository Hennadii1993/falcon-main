import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import MyDropDown from '../../components/form/MyDropDown';
import {colours, font, input} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const OrderFormsNewDetails = ({route}) => {
  const navigation = useNavigation();

  // products from previous form
  const products = route.params.products;

  var d = new Date();
  d.setMonth(d.getMonth() - 1);

  // delivery cost
  const {status: deliveryStatus, data: deliveryData} = usePostRequest(
    '/api/calculate-delivery',
    {
      products: JSON.stringify(products),
    },
  );

  // delivery date picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = formatDay(date);

  function formatDay(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = dd + '/' + mm + '/' + yyyy;
    return formattedDate;
  }

  function handleSubmit(values) {
    console.log('orderForm-values', values);
    navigation.navigate('OrderFormsNewSignature', {
      products,
      deliveryCharge: deliveryData.charge,
      authoriseName: values.authoriseName,
      siteID: values.siteID,
      orderNumber: values.orderNumber,
      customerEmail: values.customerEmail,
      dateRequired: formattedDate,
      orderNotes: values.orderNotes,
    });
  }

  const loginValidationSchema = yup.object().shape({
    authoriseName: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    orderNumber: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    customerEmail: yup.string().email('Invalid email').required('Required'),
  });

  if (deliveryData) {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              authoriseName: '',
              siteID: 0,
              orderNumber: '',
              customerEmail: '',
              notes: '',
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
                <Text style={styles.label}>Delivery Charge</Text>
                <TextInput
                  name="deliveryCharge"
                  placeholder="Delivery Charge"
                  placeholderTextColor={input.placeHolderColor}
                  style={input.textInput}
                  onChangeText={handleChange('deliveryCharge')}
                  onBlur={handleBlur('deliveryCharge')}
                  value={deliveryData.charge}
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text style={styles.label}>Authorise Name</Text>
                <TextInput
                  name="authoriseName"
                  style={input.textInput}
                  onChangeText={handleChange('authoriseName')}
                  onBlur={handleBlur('authoriseName')}
                  value={values.authoriseName}
                />
                {touched.authoriseName && errors.authoriseName && (
                  <Text style={{fontSize: 12, color: '#FF0D10'}}>
                    {errors.authoriseName}
                  </Text>
                )}
                <Text style={styles.label}>Site</Text>

                <MyDropDown name="siteID" setSiteID={setFieldValue} />

                <Text style={styles.label}>Order Number</Text>
                <TextInput
                  name="orderNumber"
                  style={input.textInput}
                  onChangeText={handleChange('orderNumber')}
                  onBlur={handleBlur('orderNumber')}
                  value={values.orderNumber}
                />
                {touched.orderNumber && errors.orderNumber && (
                  <Text style={{fontSize: 12, color: '#FF0D10'}}>
                    {errors.orderNumber}
                  </Text>
                )}

                <Text style={styles.label}>Customer Email</Text>
                <TextInput
                  name="customerEmail"
                  style={input.textInput}
                  onChangeText={handleChange('customerEmail')}
                  onBlur={handleBlur('customerEmail')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {touched.customerEmail && errors.customerEmail && (
                  <Text style={{fontSize: 12, color: '#FF0D10'}}>
                    {errors.customerEmail}
                  </Text>
                )}

                <Text style={styles.label}>Date Required</Text>
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

                <Text style={styles.label}>Notes</Text>
                <TextInput
                  name="orderNotes"
                  style={input.textInput}
                  onChangeText={handleChange('orderNotes')}
                  onBlur={handleBlur('orderNotes')}
                  value={values.orderNotes}
                />

                <View style={{alignItems: 'center', marginBottom: 30}}>
                  <TouchableOpacity
                    style={
                      isValid
                        ? input.button
                        : [input.button, styles.buttonDisabled]
                    }
                    onPress={handleSubmit}
                    disabled={!isValid}>
                    <Text style={{fontFamily: font.fontFamily, color: 'black'}}>
                      Next Step
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
  label: {
    fontFamily: font.fontFamily,
    fontSize: 14,
    fontWeight: '400',
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  buttonDisabled: {
    backgroundColor: '#e5e5e5',
  },
});

export default OrderFormsNewDetails;
