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

const SaddleCranes = ({route}) => {
  const navigation = useNavigation();

  const {status: statusResults, data: dataResults} = usePostRequest(
    '/api/website.php?action=search&type=search&type=' + 'Saddle',
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
              <View style={{width: '25%'}}>
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

              <View style={{width: '13%'}}>
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
                    textAlign: 'center',
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
                <View style={{width: '27%'}}>
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

                <View style={{width: '13%'}}>
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
                <View style={{width: '20%'}}>
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
                <View style={{width: '18%'}}>
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
                <View style={{width: '10%'}}>
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
              Saddle jib cranes offer many benefits, generally cheaper to hire
              than a luffing equivalent, quicker operation, lower power and
              easier to erect and dismantle. They can be placed onto a ballast
              base or fixing angles and climbed to great heights if required. We
              can also free stand certain models of crane in excess of 100m due
              to our extensive stock of heavy mast sections allowing your site
              to complete the building to full height without the need to climb
              the crane mechanically and have crane ties attached to their
              structure, Saving time and money.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              Please be aware a fixed jib can over sail neighbouring properties,
              sometimes causing issue and the need to gain permission to do so.
              This can lead to expensive claims against your company. Saddle jib
              cranes need to rotate with the wind when not in service.
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
                  uri: `https://www.falconcranes.co.uk/images/services/saddling-jib/falcon-cranes-saddle-jib-tower-cranes.jpg`,
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
              A site survey by FTCS Ltd to ascertain the exact nature of your
              requirements and whether this is likely to be an issue is
              recommended. We can then advise you whether this type of crane is
              the most suitable and cost effective solution for your contract.
            </Text>

            <Text style={{...styles.label, marginTop: 10}}>
              We have a large and varied fleet of cranes and are sure to be able
              to match one to your needs and budget.
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
                  uri: `https://www.falconcranes.co.uk/images/services/saddling-jib/falcon-cranes-saddle-jib-tower-cranes-2.jpg`,
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

export default SaddleCranes;
