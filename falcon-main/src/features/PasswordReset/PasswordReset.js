import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {colours, font, input} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const PasswordReset = () => {
  const navigation = useNavigation();

  const User = useUserStore();

  const handleSubmit = async values => {

    if (values.password != values.password2) {
      Alert.alert('Error', 'Please enter the same password in both fields');
    }

    if (values.password.length < 5) {
      Alert.alert('Error', 'Your new password must be at least 4 characters');
    }

    if (values.password === values.password2 && values.password.length > 4) {
      const res = await sendRequest('/api/change-password', User.token, {
          newPassword: values.password,
      });

      Alert.alert(
        'Success',
        'Your password has been changed',
        [{text: 'OK', onPress: () => navigation.navigate('Dashboard')}],
        {cancelable: false},
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 230,
          width: '100%',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{...styles.label, marginBottom: 10, fontWeight: '400'}}>
            Please change your password.
          </Text>
        </View>

        <>
          <Formik
            style={styles.form}
            initialValues={{password: '', password2: ''}}
            onSubmit={values => {
              handleSubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <TextInput
                  name="password"
                  placeholder="New Password"
                  style={input.passwordChangeInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  placeholderTextColor={input.placeHolderColor}
                />

                <TextInput
                  name="password2"
                  placeholder="Confirm New Password"
                  style={input.passwordChangeInput}
                  onChangeText={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                  value={values.password2}
                  secureTextEntry
                  placeholderTextColor={input.placeHolderColor}
                />

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={input.button}
                  disabled={!isValid}>
                  <Text>Reset Password</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: font.fontFamily,
    fontSize: 14,
    width: '80%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
  },
});

export default PasswordReset;
