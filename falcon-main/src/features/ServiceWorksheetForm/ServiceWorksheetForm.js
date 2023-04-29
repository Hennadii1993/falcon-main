import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {Formik} from 'formik';
import Loading from '../../components/Loading';
import NoResults from '../../components/NoResults';
import {colours, font, input} from '../../config';
import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';

const ServiceWorksheetForm = ({route}) => {
  const navigation = useNavigation();

  const params = route.params;

  const {status, data} = usePostRequest('/api/service-worksheet-options', {
    linkID: params.linkID,
  });

  function handleSubmit(values) {
    navigation.navigate('ServiceWorksheetMissing', {
      jobs: checked,
      linkID: params.linkID,
    });
  }

  const [checked, setChecked] = useState([]);

  const [checkAllArray, setCheckAllArray] = useState([]);

  function addRemoveCheck(value) {
    if (checked.includes(value)) {
      const checkedWithoutThisValue = checked.filter(x => x != value);
      setChecked(checkedWithoutThisValue);
    } else {
      setChecked([...checked, value]);
    }
  }

  function checkAll(array) {
    const combined = [...checked, ...array];
    let unique = [...new Set(combined)];
    setChecked(unique);
  }

  // remove all section
  function uncheckAll(array) {
    const checkedWithoutTheseValues = checked.filter(x => !array.includes(x));
    setChecked(checkedWithoutTheseValues);
  }

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    if (data.data === 0) {
      return <NoResults title="No products found" />;
    }

    return (
      <>
        <ScrollView style={{flex: 1, padding: 5}}>
          <View
            style={{
              backgroundColor: 'white',
              paddingLeft: 10,
              height: '100%',
            }}>
            <Formik
              initialValues={{}}
              onSubmit={values => handleSubmit(values)}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <View>
                  {data.data.map((item, key) => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginRight: 1,
                        key: `item${key}`,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#fdc73e',
                          padding: 5,
                          marginBottom: 5,
                        }}>
                        <View style={{width: '80%'}}>
                          <Text>{item.sectionName}</Text>
                        </View>
                        <View style={{marginRight: '1%'}}>
                          <CheckBox
                            id={item.id}
                            disabled={false}
                            style={{width: 18, height: 18, padding: 2}}
                            animationDuration={0.001}
                            onTintColor={'#878686'}
                            onCheckColor={'#878686'}
                            tintColor={'#878686'}
                            tintColors={{ true: 'grey', false: 'grey' }}
                            width={5}
                            value={checked.includes(item.id) ? true : false}
                            onValueChange={() => {
                              if (checkAllArray.includes(item.itemsArray[0])) {
                                uncheckAll(item.itemsArray);
                                const checkAllWithoutThisValue =
                                  checkAllArray.filter(
                                    x => x != item.itemsArray[0],
                                  );
                                setCheckAllArray(checkAllWithoutThisValue);
                              } else {
                                checkAll(item.itemsArray);
                                setCheckAllArray([
                                  ...checkAllArray,
                                  item.itemsArray[0],
                                ]);
                              }
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingRight: 35,
                          key: `item${key}`,
                        }}>
                        {item.items.map((item, key) => (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.headerText}>
                              {item.id} - {item.name}
                            </Text>

                            <CheckBox
                              id={item.id}
                              disabled={false}
                              style={{
                                width: 18,
                                height: 18,
                                padding: 2,
                                marginTop: 8,
                              }}
                              animationDuration={0.001}
                              onTintColor={'#878686'}
                              onCheckColor={'#878686'}
                              tintColor={'#878686'}
                              tintColors={{ true: 'grey', false: 'grey' }}
                              width={5}
                              value={checked.includes(item.id) ? true : false}
                              onValueChange={() => {
                                addRemoveCheck(item.id);
                              }}
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                  <View style={{alignItems: 'center', marginBottom: 30}}>
                    <TouchableOpacity
                      style={input.button}
                      onPress={handleSubmit}>
                      <Text
                        style={{fontFamily: font.fontFamily, color: 'black'}}>
                        Next Step
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainerYellow: {
    backgroundColor: '#fdc73e',
    marginTop: 6,
    width: '100%',
    marginBottom: 5,
  },
  headerText: {
    color: 'black',
    fontSize: 12,
    padding: 3,
    margin: 5,
    width: '100%',
  },
});

export default ServiceWorksheetForm;
