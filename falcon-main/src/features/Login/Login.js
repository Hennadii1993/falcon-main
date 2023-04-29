import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {useUserStore} from '../../store';
import {Formik} from 'formik';
import {colours, font, input} from '../../config';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import LoginSection from './components/LoginSection';

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const logMeIn = values => {
    setLoginLoading(true);
    useUserStore.getState().login(values.email, values.password);
  };

  const User = useUserStore();

  useEffect(() => {
    setLoginLoading(false);
  }, [User]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/background-image.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 230,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 160, position: 'absolute', top: -190}}
              source={require('../../assets/images/login-logo.png')}
              resizeMode="contain"
            />
          </View>

          {!loginLoading ? (
            <>
              {User.error ? (
                <Text
                  style={{
                    fontSize: 15,
                    color: '#fff',
                    backgroundColor: '#e26139',
                    height: 40,
                    paddingTop: 8,
                    width: 250,
                    fontFamily: font.fontFamily,
                    position: 'absolute',
                    top: -45,
                    textAlign: 'center',
                  }}>
                  {User.error}
                </Text>
              ) : (
                ''
              )}

              <View style={{width: 250}}>
                <Formik
                  style={styles.form}
                  initialValues={{email: '', password: ''}}
                  onSubmit={values => logMeIn(values)}>
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
                        name="email"
                        placeholder="Username"
                        style={input.loginInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        placeholderTextColor={input.placeHolderColor}
                      />
                      {errors.email && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.email}
                        </Text>
                      )}
                      <TextInput
                        name="password"
                        placeholder="Password"
                        style={input.loginInput}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                        placeholderTextColor={input.placeHolderColor}
                      />
                      {errors.password && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.password}
                        </Text>
                      )}
                      <TouchableOpacity
                        onPress={handleSubmit}
                        title="LOGIN"
                        style={{...styles.loginButton, marginLeft: 5}}
                        disabled={!isValid}>
                        <Text style={{color: 'black'}}>Login</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Formik>
              </View>

              <View>
                <LoginSection
                  buttons={[
                    {
                      key: 'link_1',
                      title: 'Crane calculator',
                      colour: '#fdc73e',
                      icon: 'search',
                      goto: 'CraneCalculator',
                    },
                    {
                      key: 'link_2',
                      title: 'Saddle jib tower cranes',
                      colour: '#fdc73e',
                      icon: 'aperture',
                      goto: 'SaddleCranes',
                    },
                    {
                      key: 'link3',
                      title: 'Luffing jib tower cranes',
                      colour: '#fdc73e',
                      icon: 'box',
                      goto: 'LuffingCranes',
                    },
                    {
                      key: 'link_4',
                      title: 'Self erecting tower cranes',
                      colour: '#fdc73e',
                      icon: 'user',
                      goto: 'SelfErecting',
                    },
                    {
                      key: 'link_5',
                      title: 'Truck mounted cranes',
                      colour: '#fdc73e',
                      icon: 'truck',
                      goto: 'TruckMounted',
                    },
                    {
                      key: 'link6',
                      title: 'Power generation',
                      colour: '#fdc73e',
                      icon: 'battery-charging',
                      goto: 'PowerGeneration',
                    },
                    {
                      key: 'link_7',
                      title: 'Spray booth',
                      colour: '#fdc73e',
                      icon: 'wind',
                      goto: 'SprayBooth',
                    },
                    {
                      key: 'link_8',
                      title: 'Documents',
                      colour: '#fdc73e',
                      icon: 'book-open',
                      goto: 'Documents',
                    },
                    {
                      key: 'link9',
                      title: 'Contact us',
                      colour: '#fdc73e',
                      icon: 'phone-call',
                      goto: 'ContactUs',
                    },
                  ]}></LoginSection>
              </View>
            </>
          ) : (
            <Loading />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    elevation: 3,
    width: 250,
    backgroundColor: '#f2f2f2',
    color: 'red',
    fontFamily: font.fontFamily,
  },
});

export default Login;
