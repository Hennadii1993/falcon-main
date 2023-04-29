import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import Loading from '../../components/Loading';
import NoResults from '../../components/NoResults';
import {colours, font, input, endpoint} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import {Icon} from '@rneui/themed';
import {sendRequest} from '../../client';
import {Formik} from 'formik';

import axios from 'axios';

const Document = ({route}) => {
  const navigation = useNavigation();
  const User = useUserStore();
  const Viewer = useRef(null);

  const actionSheetRef = useRef(null);

  const documentType = route.params.documentType;

  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (Viewer.current && Viewer.current.height) {
      setCurrentHeight(Viewer.current.height);
    }
  }, [Viewer.current]);

  const auth = {
    headers: {
      Authorization: (User.me && User.me.token) ?? false,
      NewApp: 1,
    },
  };

  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  const isSupervisor = User.me.userAppSections.includes('Supervisor') ? 1 : 0;

  const [currentPoints, setCurrentPoints] = useState([]);
  const [currentHeight, setCurrentHeight] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  // when the page first loads
  useEffect(() => {
    console.log(1)
    const fetchData = async () => {
      console.log(2)
      setStatus('fetching');
      const res = await axios.post(
        `${endpoint}` + '/api/document-data',
        {
          documentType,
          documentID: route.params.documentID,
        },
        auth,
      );
      if (res) {
        console.log('222', JSON.stringify(res.data))

        setData(res.data);
        pointsFunctionExplictDataAndPage(res.data, 1);
        setCurrentPage(0);
      }
      setStatus('fetched');
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const res = await axios.post(
        `${endpoint}` + '/api/document-data',
        {
          documentType,
          documentID: route.params.documentID,
        },
        auth,
      );
      if (res) {
        setData(res.data);

        console.log('111', JSON.stringify(res.data))

        if (currentPage) {
          pointsFunctionExplictDataAndPage(res.data, currentPage + 1);
          setCurrentPage(currentPage);
        }
      }
      setStatus('fetched');
    };

    fetchData();
  }, [isFocused]);

  function pointsFunctionExplictDataAndPage(latestData, page) {
    setCurrentPoints(latestData.results.find(p => p.page == page).points);
  }

  function pointsFunction(page) {
    setCurrentPoints(data.results.find(p => p.page == page).points);
  }

  function navigateToSign() {
    navigation.navigate('BulletinsSign', {
      documentID: route.params.documentID,
    });
  }

  const handleSubmit = async values => {
    const requestBody = {
      documentID: route.params.documentID,
      documentType: route.params.documentType,
      email: values.email,
    };

    const res = await sendRequest(
      '/api/send-document',
      User.token,
      requestBody,
    );

    Alert.alert(
      'Done',
      'Thank you, your email has been sent',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Document', {
              documentID: route.params.documentID,
              documentType: route.params.documentType,
            }),
        },
      ],

      {cancelable: false},
    );
  };

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    const images = [];

    if (data.results) {
      data.results.map((item, key) => images.push({url: `${item.image}`}));
    }

    if (data.countPages < 1) {
      return <NoResults title="No document found" />;
    }

    const nextSignature =
      documentType == 'rams' ? data.nextSignature : undefined;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ImageViewer
            ref={Viewer}
            index={Number(currentPage)}
            imageUrls={images}
            renderHeader={() => <Text></Text>}
            onChange={page => {
              pointsFunction(page + 1);
              setCurrentPage(page);
            }}
          />

          {modalVisible ? (
            <View style={{width: 100}}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
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
                          <Text
                            style={{
                              fontFamily: font.fontFamily,
                              color: 'black',
                            }}>
                            Enter email address
                          </Text>
                          <TextInput
                            name="email"
                            style={{
                              ...input.loginInput,
                              width: 250,
                              color: 'black',
                            }}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
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
                                  Send
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

          {isSupervisor ? (
            <View style={styles.overlay}>
              {currentPoints?.map(point => (
                <TouchableNativeFeedback
                  hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  onPress={() => {
                    point.barcode > nextSignature.barcode &&
                    point.signature == 0
                      ? Alert.alert(
                          `Warning`,
                          `You have missed a signature hold point on page ${nextSignature.pageNumber}`,
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('No Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: `Go to page ${nextSignature.pageNumber}`,
                              onPress: () => {
                                setCurrentPage(
                                  String(Number(nextSignature.pageNumber - 1)),
                                );
                                pointsFunction(nextSignature.pageNumber);
                              },
                            },
                            {
                              text: `Sign Anyway`,
                              onPress: () => {
                                navigation.navigate('RamsSignatureSign', {
                                  barcode: point.barcodeString.substring(1),
                                  name: point.name ? point.name : '',
                                  signatureDate: point.signatureDate
                                    ? point.signatureDate
                                    : '',
                                });
                              },
                            },
                          ],
                        )
                      : navigation.navigate('RamsSignatureSign', {
                          barcode: point.barcodeString.substring(1),
                          name: point.name ? point.name : '',
                          signatureDate: point.signatureDate
                            ? point.signatureDate
                            : '',
                        });
                  }}>
                  <View
                    style={{
                      zIndex: 1,
                      width: 50,
                      height: 20,
                      opacity: 0.5,
                      backgroundColor:
                        point.signature != 0
                          ? 'green'
                          : point.countComments == 0
                          ? 'red'
                          : 'orange',
                      position: 'absolute',
                      color: 'purple',
                      // left:
                      //   (
                      //     (
                      //       point.barcode == nextSignature.barcode &&
                      //       point.signature == 0
                      //     ) ||
                      //     (
                      //       point.positionTag == 'FTCS_Service'
                      //     )
                      //   )
                      //     ? Number(point.posLeft)
                      //     : '90%',
                      left: Number(point.posLeft) - 25,
                      top:
                        (100 / 753) * currentHeight +
                        (Number(point.posTop) / 842) * (currentHeight / 1.36),
                    }}></View>
                </TouchableNativeFeedback>
              ))}
            </View>
          ) : (
            ''
          )}

          <View
            style={{
              backgroundColor: 'black',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'flex-end',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '50%',
                alignItems: 'flex-start',
              }}>
              {route.params.documentType == 'rams' ? (
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current.show();
                  }}>
                  <Icon name="layers" type="feather" color="white" />
                </TouchableOpacity>
              ) : null}
            </View>

            <View
              style={{
                width: '50%',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{zIndex: 1}}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Icon name="mail" type="feather" color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {route.params.signatureRequired ? (
            <View>
              <TouchableOpacity
                onPress={() => navigateToSign()}
                title="SIGN"
                style={styles.loginButton}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  SIGN TO CONFIRM IT HAS BEEN READ AND UNDERSTOOD
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}

          <ActionSheet
            style={{
              margin: 10,
            }}
            ref={actionSheetRef}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 10,
              }}>
              <View style={{padding: 4}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: font.fontFamily,
                    fontWeight: '300',
                    color: 'grey',
                  }}>
                  What would you like to do?
                </Text>
              </View>
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                }}
              />

              {isSupervisor ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current.hide();
                      navigation.navigate('ManageCrew', {
                        documentID: route.params.documentID,
                      });
                    }}>
                    <View style={{padding: 10}}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          color: 'grey',
                        }}>
                        Manage crew
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      height: 0.5,
                      width: '100%',
                      backgroundColor: '#C8C8C8',
                    }}
                  />
                </>
              ) : null}

              {isSupervisor ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current.hide();
                      navigation.navigate('RamsComments', {
                        documentID: route.params.documentID,
                      });
                    }}>
                    <View style={{padding: 10}}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          color: 'grey',
                        }}>
                        Comments / amendments
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      height: 0.5,
                      width: '100%',
                      backgroundColor: '#C8C8C8',
                    }}
                  />
                </>
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  actionSheetRef.current.hide();
                  setCurrentPage(data.nextSignature.pageNumber - 1);
                  pointsFunction(data.nextSignature.pageNumber);
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Next signature point
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  actionSheetRef.current.hide();

                  Alert.prompt(
                    'Which page?',
                    'Enter the page number you would like to view.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Show',
                        onPress: page => {
                          if (Number(data.countPages) >= Number(page)) {
                            setCurrentPage(page - 1);
                            pointsFunction(page);
                          } else {
                            Alert.alert(
                              `Please select a page between 1-${data.countPages}`,
                            );
                          }
                        },
                      },
                    ],
                  );
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Choose your page
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => actionSheetRef.current.hide()}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 12,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'grey',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </ActionSheet>
        </View>
      </SafeAreaView>
    );
  }
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

export default Document;
