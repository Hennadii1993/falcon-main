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
import {useState} from 'react';
import {colours, font, input} from '../../config';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import Loading from '../../components/Loading';
import DropDown from '../../components/form/DropDown';
import {Icon} from '@rneui/themed';

const LuffingCranes = ({route}) => {
  const navigation = useNavigation();

  const {status: statusResults, data: dataResults} = usePostRequest(
    '/api/website.php?action=search&type=search&type=' + 'Luffing',
    {},
  );

  if (statusResults == 'fetching') {
    return <Loading />;
  }

  if (statusResults == 'fetched') {
    return (
      <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={true}>
        <View style={styles.mainContainer}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <View style={{width: '28%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: 'black'
                  }}>
                  Make + Model
                </Text>
              </View>

              <View style={{width: '15%'}}>
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
              <View style={{width: '15%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: 'black'
                  }}>
                  Jib End Capacity
                </Text>
              </View>
              <View style={{width: '15%'}}>
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
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    color: 'black',
                  }}></Text>
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
                  backgroundColor: key % 2 == 0 ? 'white' : '#ececec',
                }}>
                <View style={{width: '28%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'left',
                      color: 'black',
                    }}>
                    {item.make} - {item.model}
                  </Text>
                </View>

                <View style={{width: '15%'}}>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'black',
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
                      color: 'black',
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
                      color: 'black',
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

            <Text style={{...styles.label, marginTop: 30}}>
              Luffing jib cranes have many benefits and are widely used in
              cities and congested areas. You are able to get multiple cranes
              onto sites and avoid over sail situations with neighboring
              properties. This means costly licences would not be necessary.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              Luffing jib cranes can be placed on fixing angles or ballast bases
              and can be erected and climbed to great heights. With our
              exclusive ‘park radius device’ our Jaso luffing jib cranes can all
              be parked at vastly reduced radius when out of service.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              This means that you could add another crane to a job to increase
              productivity where you might not otherwise be able to do so. Also
              perhaps cranes could be located outside a building, still avoiding
              over sail and enabling you to achieve a watertight structure
              sooner.
            </Text>

            <View
              style={{
                width: '100%',
                marginBottom: 10,
                borderWidth: 0.4,
                borderColor: 'grey',
              }}>
              <Image
                source={{
                  uri: `https://www.falconcranes.co.uk/images/services/luffing-jib/falcon-cranes-luffing-jib-tower-cranes.jpg`,
                }}
                style={{
                  height: 160,
                  width: '100%',
                  margin: 1,
                  marginLeft: '1%',
                }}
              />
            </View>

            <Text style={{...styles.label, marginTop: 10}}>
              Luffing cranes can be fitted with Zoning devices to electronically
              limit against over sailing important or dangerous structures
              adjacent to site. This can include schools, public area's or main
              highways and they are usually mandatory next to railway and
              electrical installations.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              We recommend visiting site or your premises at planning to advise
              on the most cost effective and efficient crane for your particular
              project.
            </Text>

            <View
              style={{
                width: '100%',
                marginBottom: 10,
                borderWidth: 0.4,
                borderColor: 'grey',
              }}>
              <Image
                source={{
                  uri: `https://www.falconcranes.co.uk/images/services/luffing-jib/falcon-cranes-luffing-jib-tower-cranes-2.jpg`,
                }}
                style={{
                  height: 160,
                  width: '100%',
                  margin: 1,
                  marginLeft: '1%',
                }}
              />
            </View>
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
    color: 'black',
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
});

export default LuffingCranes;
