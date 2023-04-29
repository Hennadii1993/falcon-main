import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useRef} from 'react';
import * as yup from 'yup';
import {colours, font, input} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import {sendRequest} from '../../client';
import {Formik} from 'formik';
import DropDown from '../../components/form/DropDown';

const YardAssetEdit = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [submitting, setSubmitting] = useState(false);

  const [assetStatus, setAssetStatus] = useState();
  const [assetType, setAssetType] = useState();

  const [assetMonth, setAssetMonth] = useState();
  const [assetYear, setAssetYear] = useState();

  const {status, data} = usePostRequest('/api/asset', {
    assetID: route.params.assetID,
    assetBarcode: route.params.assetBarcode,
  });

  const handleSubmit = async values => {
    setSubmitting(true);

    const requestBody = {
      assetBarcode: route.params.assetBarcode
        ? route.params.assetBarcode
        : data.assetData.assetBarcode,
      assetID: data.assetData.assetID ? data.assetData.assetID : null,
      componentType: values.assetType
        ? values.assetType
        : data.assetData.assetType,
      serialNumber: values.serialNumber,
      manfactureDateMonth: assetMonth
        ? assetMonth
        : data.assetData.manfactureDateMonth,
      manfactureDateYear: assetYear
        ? assetYear
        : data.assetData.manfactureDateYear,
      colour: values.colour,
      colourRAL: values.colourRAL,
      assetStatus: assetStatus ? assetStatus : data.assetData.assetStatus,
      assetLocation: values.assetLocation,
    };

    const res = await sendRequest('/api/asset-add', User.token, requestBody);

    setSubmitting(false);

    Alert.alert(
      'Submitted',
      'Component successfully updated',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('YardAsset', {
              assetID: data.assetData.assetID,
              assetBarcode: route.params.assetBarcode,
            }),
        },
      ],
      {cancelable: false},
    );
  };

  const loginValidationSchema = yup.object().shape({});

  if (status == 'fetched') {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <>
            <Formik
              style={styles.form}
              enableReinitialize
              initialValues={{
                serialNumber: data.assetData.serialNumber,
                colourRAL: data.assetData.colourRAL,
                colour: data.assetData.colour,
                assetLocation: data.assetData.assetLocation,
                status: data.assetData.assetStatus,
                manfactureDateMonth: data.assetData.manfactureDateMonth,
                manfactureDateYear: data.assetData.manfactureDateYear,
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
                  <View style={{display: 'flex', flexDirection: 'column'}}>
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
                        <Text style={styles.label}>
                          {data.assetData.assetBarcode
                            ? data.assetData.assetBarcode
                            : route.params.assetBarcode}
                        </Text>
                      </View>
                    </View>

                    {!data.assetData.assetID ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '95%',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        <View style={{width: '40%'}}>
                          <Text style={styles.label}>Type</Text>
                        </View>
                        <View style={{width: '60%'}}>
                          <DropDown
                            setDropDown={setAssetType}
                            value={values.assetType}
                            items={data.assetTypes.map(item => ({
                              label: item.assetTypeName,
                              value: item.assetTypeID,
                            }))}
                          />
                        </View>
                      </View>
                    ) : null}

                    {!data.assetData.assetID ? (
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
                            <Text style={styles.label}>Type</Text>
                          </View>
                          <View style={{width: '60%'}}>
                            <Text style={styles.label}>
                              {
                                data.assetTypes.filter(
                                  x => x.assetTypeID == 10,
                                )[0].assetTypeName
                              }
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
                            <Text style={styles.label}>Name</Text>
                          </View>
                          <View style={{width: '60%'}}>
                            <Text style={styles.label}>
                              {data.assetData.componentName}
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
                            <Text style={styles.label}>Jaso Part No.</Text>
                          </View>
                          <View style={{width: '60%'}}>
                            <Text style={styles.label}>
                              {data.assetData.componentJaso}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : null}

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Serial</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <TextInput
                          name="serialNumber"
                          style={{...input.loginInput, paddingLeft: 8}}
                          onChangeText={handleChange('serialNumber')}
                          onBlur={handleBlur('serialNumber')}
                          value={values.serialNumber}
                          placeholderTextColor={input.placeHolderColor}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '95%',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Manufacturer Month</Text>
                      </View>
                      <View
                        style={{
                          width: '60%',
                          borderWidth: 0.2,
                          borderColor: 'grey',
                          padding: 10,
                          marginLeft: 2,
                        }}>
                        <DropDown
                          setDropDown={setAssetMonth}
                          value={
                            assetMonth
                              ? Number(assetMonth)
                              : Number(data.assetData.manfactureDateMonth)
                          }
                          items={data.months.map(item => ({
                            label: item.monthName,
                            value: item.monthID,
                          }))}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '95%',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Manufacturer Year</Text>
                      </View>
                      <View
                        style={{
                          width: '60%',
                          borderWidth: 0.2,
                          borderColor: 'grey',
                          padding: 10,
                          marginLeft: 2,
                        }}>
                        <DropDown
                          setDropDown={setAssetYear}
                          value={
                            assetYear
                              ? Number(assetYear)
                              : Number(data.assetData.manfactureDateYear)
                          }
                          items={data.years.map(itemYear => ({
                            label: String(itemYear.yearName),
                            value: itemYear.yearID,
                          }))}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Colour</Text>
                      </View>
                      <View style={{width: '30%'}}>
                        <TextInput
                          name="colour"
                          style={{...input.loginInput, paddingLeft: 8}}
                          onChangeText={handleChange('colour')}
                          onBlur={handleBlur('colour')}
                          value={values.colour}
                          placeholderTextColor={input.placeHolderColor}
                          placeholder="Colour"
                        />
                      </View>
                      <View style={{width: '30%'}}>
                        <TextInput
                          name="colourRAL"
                          style={{...input.loginInput, paddingLeft: 8}}
                          onChangeText={handleChange('colourRAL')}
                          onBlur={handleBlur('colourRAL')}
                          value={values.colourRAL}
                          placeholderTextColor={input.placeHolderColor}
                          placeholder="RAL"
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '95%',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Status</Text>
                      </View>
                      <View
                        style={{
                          width: '60%',
                          borderWidth: 0.2,
                          borderColor: 'grey',
                          padding: 10,
                          marginLeft: 2,
                        }}>
                        <DropDown
                          setDropDown={setAssetStatus}
                          value={
                            assetStatus
                              ? assetStatus
                              : data.assetData.assetStatus
                          }
                          items={data.assetStatuses.map(item => ({
                            label: item.assetStatusName,
                            value: item.assetStatusID,
                          }))}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '95%',
                        padding: 5,
                      }}>
                      <View style={{width: '40%'}}>
                        <Text style={styles.label}>Location</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <TextInput
                          name="assetLocation"
                          style={{...input.loginInput, paddingLeft: 8}}
                          onChangeText={handleChange('assetLocation')}
                          onBlur={handleBlur('assetLocation')}
                          value={values.assetLocation}
                          placeholderTextColor={input.placeHolderColor}
                        />
                      </View>
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
                              {item.workTypeName} / {item.name} /{' '}
                              {item.workDate}
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
                      style={
                        !submitting ? input.button : [input.buttonDisabled]
                      }
                      onPress={handleSubmit}
                      disabled={submitting}>
                      <Text
                        style={{
                          fontFamily: font.fontFamily,
                          fontWeight: '400',
                          color: 'black'
                        }}>
                        Update Component
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
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
});

export default YardAssetEdit;
