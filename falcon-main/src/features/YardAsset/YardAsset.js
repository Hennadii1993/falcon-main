import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef, useEffect} from 'react';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import ActionSheet from 'react-native-actions-sheet';
import {sendRequest} from '../../client';
import {useIsFocused} from '@react-navigation/native';

const YardAsset = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [submitting, setSubmitting] = useState(false);

  const isFocused = useIsFocused();

  const {status, data} = usePostRequest('/api/asset' + '?focus=' + isFocused, {
    assetID: route.params.assetID,
    assetBarcode: route.params.assetBarcode,
  });

  const actionSheetRef = useRef(null);

  const scrapAsset = async value => {
    const res = await sendRequest('/api/asset-scrap', User.token, {
      assetID: value,
    });

    Alert.alert('Success', `This asset has been scrapped`);

    navigation.navigate('YardBarcoding', {});
  };

  const handleSubmit = async values => {};

  const loginValidationSchema = yup.object().shape({});

  if (status == 'fetched') {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Barcode</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>{data.assetData.assetBarcode}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Type</Text>
              </View>
              <View style={{width: '60%'}}>
                {/* <Text style={styles.label}>
                  {
                    data.assetTypes.filter(x => x.assetTypeID == 10)[0]
                      .assetTypeName
                  }
                </Text> */}
                <Text style={styles.label}>{data.assetData.assetTypeName}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Name</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>{data.assetData.componentNameNew}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Serial</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}> {data.assetData.serialNumber}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Manufacturer</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>
                  {data.assetData.manfactureDate}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Colour</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>{data.assetData.colour}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Status</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>
                  {data.assetData.assetStatusName}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Location</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>{data.assetData.assetLocation}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
                padding: 5,
                marginBottom: 5,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.label}>Jaso Part No.</Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={styles.label}>{data.assetData.componentJaso}</Text>
              </View>
            </View>

            <View>
              {data.history.map((item, key) => (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginLeft: '5%',
                      }}>
                      <Text
                        style={{
                          ...styles.label,
                          color: 'grey',
                          textAlign: 'left',
                        }}>
                        {item.workTypeName} / {item.name} / {item.workDate}
                      </Text>
                    </View>

                    <View>
                      {item.workData.map((row, key) => (
                        <Text
                          style={{
                            ...styles.label,
                            marginLeft: '5%',
                            paddingTop: 2,
                            paddingBottom: 2,
                          }}>
                          {row}
                        </Text>
                      ))}
                    </View>

                    {item.image ? (
                      <View>
                        <Image
                          source={{
                            uri: `${item.image}`,
                          }}
                          style={{
                            height: 150,
                            width: '75%',
                            margin: 5,
                            marginLeft: '5%',
                          }}
                        />
                      </View>
                    ) : null}
                  </View>
                </>
              ))}
            </View>

            <View style={{alignItems: 'center', marginBottom: 30}}>
              <TouchableOpacity
                style={!submitting ? input.button : [input.buttonDisabled]}
                onPress={() => {
                  actionSheetRef.current.show();
                }}
                disabled={submitting}>
                <Text style={{fontFamily: font.fontFamily, fontWeight: '400', color: 'black'}}>
                  Update Component
                </Text>
              </TouchableOpacity>
            </View>

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
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current.hide();
                    navigation.navigate('YardAssetEdit', {
                      assetID: route.params.assetID,
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
                      Edit component
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current.hide();
                    navigation.navigate('YardSprayShopWorksheet', {
                      assetID: route.params.assetID,
                    });
                  }}>
                  <View
                    style={{
                      height: 0.5,
                      width: '100%',
                      backgroundColor: '#C8C8C8',
                    }}
                  />
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: font.fontFamily,
                        fontWeight: '400',
                        color: 'grey',
                      }}>
                      Spray shop worksheet
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
                    navigation.navigate('YardFabricationWorksheet', {
                      assetID: route.params.assetID,
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
                      Fabrication worksheet
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
                    navigation.navigate('YardAssetNDT', {
                      assetID: route.params.assetID,
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
                      NDT testing worksheet
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current.hide();

                    Alert.alert(
                      `Are you sure?`,
                      'Do you really want to mark this component as scrapped or sold?',
                      [
                        {
                          text: 'No',
                          onPress: () => console.log('No Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            scrapAsset(route.params.assetID);
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
                      Scrap or sell component
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
          </>
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
    fontWeight: '400',
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
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
    color: 'black'
  },
});

export default YardAsset;
