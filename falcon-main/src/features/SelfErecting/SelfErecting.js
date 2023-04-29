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

const SelfErecting = ({route}) => {
  const navigation = useNavigation();

  const {status: statusResults, data: dataResults} = usePostRequest(
    '/api/website.php?action=search&type=search&type=' + 'Self-Erecting',
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
              <View style={{width: '30%'}}>
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
              <View style={{width: '15%'}}>
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
                <View style={{width: '30%'}}>
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
                <View style={{width: '15%'}}>
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
              We are able to offer a wide selection of cost effective, small
              city tower cranes and self erecting cranes suitable for most
              applications. These cranes are ideal where room is limited or a
              large crane is simply not needed. Low on power consumption and
              versatile these cranes can be slotted onto almost any site.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              The CRL3036 and Potain 340 A are based on a crawler chassis, these
              cranes can be tracked whilst erected around a level site,
              utilising their own on board generator. ‘ Just add fuel ‘
              alternatively they can accommodate an electrical feed from the
              mains if used in a static location.
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
                  uri: `https://www.falconcranes.co.uk/images/services/self-erecting/falcon-cranes-self-erecting-cranes.jpg`,
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
              Our new Falcon LCL 20.1 luffing crane is an ideal crane where over
              sail is an issue. This small crane can be erected on fixing angles
              or a ballast base, it is remote control and can also be utilised
              as a derrick crane.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              City cranes are small remote control saddle jib cranes, lifting
              slightly more than the self-erectors and utilising longer jibs
              they are small on power usage but big on performance. They require
              a mobile crane to be erected.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              For those hard to reach places, Falcon has a state of the art GAPO
              delivery system. With this system we can solve most issues with
              siting a crane to suit your project.
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
                  uri: `https://www.falconcranes.co.uk/images/services/self-erecting/falcon-cranes-self-erecting-cranes-2.jpg`,
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

export default SelfErecting;
