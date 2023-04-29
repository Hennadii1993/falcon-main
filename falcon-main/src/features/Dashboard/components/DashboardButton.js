import * as React from 'react';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Alert, Modal, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {colours, font, input} from '../../../config';
import {useUserStore} from '../../../store';
import {sendRequest} from '../../../client';
import {useState} from 'react';
import {Formik} from 'formik';

const DashboardButton = props => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async values => {

    const res = await sendRequest('/api/validate-password', User.token, {
      password: values.password,
    });

    if (res.status == 1) {
      navigation.navigate('Personnel');
    } else {
      Alert.alert(`Error`, 'Please enter your correct password');
    }
  };

  const containerStyle = {
    height: 110,
    width: props.width ?? '30%',
    margin: 6,
  };

  const titleStyle = {
    color: '#7f7f7f',
    fontSize: 16,
    marginTop: 5,
    fontWeight: '400',
    fontFamily: font.fontFamily,
  };

  const buttonStyle = {
    borderColor: '#c0c0c0',
    backgroundColor: '#fff',
    height: '100%',
    flexDirection: 'column',
  };

  return (
    <>
      {props.goto === 'Personnel' ? (
        <View style={containerStyle}>
          <Button
            icon={{
              name: props.icon,
              type: 'feather',
              size: 60,
              color: props.colour,
            }}
            title={props.title}
            type="outline"
            raised
            buttonStyle={buttonStyle}
            titleStyle={titleStyle}
            containerStyle={{width: '100%'}}
            onPress={
              () => setModalVisible(true)
            }
          />

          {modalVisible ? (
            <View style={{width: 100}}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Formik
                      style={styles.form}
                      enableReinitialize
                      initialValues={{
                        email: '',
                      }}
                      onSubmit={values => handleSubmit(values)}>
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isValid,
                      }) => (
                        <>
                          <Text style={{fontFamily: font.fontFamily, color: 'black'}}>Enter your password</Text>

                          <TextInput
                            name="password"
                            style={{...input.loginInput, width: 250}}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                          />

                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View>
                              <TouchableOpacity
                                style={{
                                  ...input.button,
                                  backgroundColor: 'green',
                                  width: 120,
                                  margin: 5,
                                }}
                                onPress={() => {
                                  handleSubmit();
                                  setModalVisible(!modalVisible);
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.fontFamily,
                                    fontWeight: '400',
                                    color: 'white',
                                  }}>
                                  Submit
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View>
                              <TouchableOpacity
                                style={{
                                  ...input.button,
                                  backgroundColor: 'red',
                                  width: 120,
                                  margin: 5,
                                }}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text
                                  style={{
                                    fontFamily: font.fontFamily,
                                    fontWeight: '400',
                                    color: 'white',
                                  }}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </>
                      )}
                    </Formik>
                  </View>
                </View>
              </Modal>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={containerStyle}>
          <Button
            icon={{
              name: props.icon,
              type: 'feather',
              size: 60,
              color: props.colour,
            }}
            title={props.title}
            type="outline"
            raised
            buttonStyle={buttonStyle}
            titleStyle={titleStyle}
            containerStyle={{width: '100%'}}
            onPress={() => navigation.navigate(props.goto)}
          />
        </View>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    elevation: 3,
    backgroundColor: '#e3aa0e',
    fontFamily: font.fontFamily,
    color: 'black',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DashboardButton;
