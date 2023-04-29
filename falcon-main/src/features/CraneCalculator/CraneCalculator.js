import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {colours, font, input} from '../../config';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import Loading from '../../components/Loading';
import DropDown from '../../components/form/DropDown';
import {Icon} from '@rneui/themed';

const CraneCalculator = ({route}) => {
  const navigation = useNavigation();

  const [craneType, setCraneType] = useState('&type=all');
  const [craneJibEnd, setCraneJibEnd] = useState('');
  const [craneJibLength, setCraneJibLength] = useState('');
  const [craneJibCapacity, setCraneJibCapacity] = useState('');

  const [searchString, setSearchString] = useState('&type=all');

  const {status, data} = usePostRequest('/api/website.php?action=list', {});

  const {status: statusResults, data: dataResults} = usePostRequest(
    '/api/website.php?action=search&type=search&type=' + searchString,
    {},
  );

  useEffect(() => {
    const search =
      (craneType ? '&type=' + craneType : 'all') +
      (craneJibEnd ? '&capacityJibEnd=' + craneJibEnd : '') +
      (craneJibLength ? '&jibLength=' + craneJibLength : '') +
      (craneJibCapacity ? '&maximumCapacity=' + craneJibCapacity : '');
    setSearchString(search);
  }, [craneType, craneJibEnd, craneJibLength, craneJibCapacity]);

  console.log('dataResults', dataResults);

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched' && statusResults == 'fetched') {
    return (
      <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={true}>
        <View style={styles.mainContainer}>
          <>
            {/* <Text>{searchString}</Text> */}

            <View style={{display: 'flex', flexDirection: 'column'}}>
              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.label}>Select Crane Type</Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    borderColor: 'grey',
                    borderWidth: 0.2,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <DropDown
                    setDropDown={value => {
                      setCraneType(value);
                    }}
                    value={craneType}
                    items={data.total[0].types.map(item => ({
                      label: item.display,
                      value: item.value,
                    }))}
                  />
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.label}>Select Capacity Jib End</Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    borderColor: 'grey',
                    borderWidth: 0.2,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <DropDown
                    setDropDown={value => {
                      setCraneJibEnd(value);
                    }}
                    value={craneJibEnd}
                    items={data.total[0].capacityJibEnd.map(item => ({
                      label: item.display,
                      value: item.value,
                    }))}
                  />
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.label}>Select Jib Length</Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    borderColor: 'grey',
                    borderWidth: 0.2,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <DropDown
                    setDropDown={value => {
                      setCraneJibLength(value);
                    }}
                    value={craneJibLength}
                    items={data.total[0].jibLength.map(item => ({
                      label: item.display,
                      value: item.value,
                    }))}
                  />
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <View style={{width: '50%'}}>
                  <Text style={styles.label}>Select Jib Capacity</Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    borderColor: 'grey',
                    borderWidth: 0.2,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <DropDown
                    setDropDown={value => {
                      setCraneJibCapacity(value);
                    }}
                    value={craneJibCapacity}
                    items={data.total[0].maximumCapacity.map(item => ({
                      label: item.display,
                      value: item.value,
                    }))}
                  />
                </View>
              </View>
            </View>


            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 20,
              }}>
              <View style={{width: '23%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  Make + Model
                </Text>
              </View>
              <View style={{width: '25%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: 'black'
                  }}>
                  Type
                </Text>
              </View>
              <View style={{width: '17%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: 'black'
                  }}>
                  Jib {'\n'} Length
                </Text>
              </View>
              <View style={{width: '14%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  Jib End Capacity
                </Text>
              </View>
              <View style={{width: '19%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: 'black'
                  }}>
                  Max Capacity
                </Text>
              </View>
              <View style={{width: '5%'}}>
                <Text
                  style={{fontFamily: font.fontFamily, fontSize: 14, color: 'black'}}></Text>
              </View>
            </View>


            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: 'black',
                marginTop: 3,
                marginBottom: 3,
              }}
            />

            {dataResults.cranes.map((item, key) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: 2,
                  marginTop: 5,
                  backgroundColor: key %2 == 0 ? 'white' : '#ececec'
                }}>
                <View style={{width: '23%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'left',
                      color: 'black'
                    }}>
                    {item.make} - {item.model}
                  </Text>
                </View>
                <View style={{width: '23%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'black'
                    }}>
                    {item.type}
                  </Text>
                </View>
                <View style={{width: '15%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'black'
                    }}>
                    {item.jibLength}
                  </Text>
                </View>
                <View style={{width: '15%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'black'
                    }}>
                    {item.capacityJibEnd}
                  </Text>
                </View>
                <View style={{width: '15%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'black'
                    }}>
                    {item.maximumCapacity}
                  </Text>
                </View>
                <View style={{width: '5%'}}>
                  <Icon
                    name="arrow-down-circle"
                    type="feather"
                    color="grey"
                    width="100%"
                    size={15}
                    onPress={() =>
                      navigation.navigate('PDFviewer', {
                        uri: item.spec,
                      })
                    }
                  />
                </View>
              </View>
            ))}
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
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
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

export default CraneCalculator;
