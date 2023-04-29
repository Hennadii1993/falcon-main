import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {colours, font, input} from '../../config';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import Loading from '../../components/Loading';
import RenderHtml from 'react-native-render-html';
import {Icon} from '@rneui/themed';

const PowerGeneration = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest(
    '/api/external.php?action=power-generation',
    {},
  );

  const alternatingColor = ['#d5d5d5', '#a9a9a9'];

  const {width} = useWindowDimensions();

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    const source = {
      html: `${data.output.html}`,
    };

    return (
      <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={true}>
        <View style={styles.mainContainer}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <View style={{width: '13%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  {data.output.tableHeader[0]}
                </Text>
              </View>

              <View style={{width: '23%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  {data.output.tableHeader[1]}
                </Text>
              </View>

              <View style={{width: '15%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  {data.output.tableHeader[2]}
                </Text>
              </View>

              <View style={{width: '13%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  {data.output.tableHeader[3].replace("Fuel Usage (Prime)", "")}
                </Text>
              </View>

              <View style={{width: '15%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  {data.output.tableHeader[4].replace("Fuel Usage (Prime)", "")}
                </Text>
              </View>

              <View style={{width: '10%'}}>
                <Text
                  style={{
                    fontFamily: font.fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    textAlign: 'left',
                    color: 'black'
                  }}>
                  {data.output.tableHeader[5].replace("Fuel Usage (Prime)", "")}

                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'black',
                marginBottom: 3,
              }}
            />

            {data.output.tableBody.map((item, key) => (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-start',
                    marginBottom: 2,
                    marginTop: 2,
                    backgroundColor: key % 2 == 0 ? 'white' : '#ececec',
                  }}>
                  <View style={{width: '15%'}}>
                    <Text
                      style={{
                        fontFamily: font.fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        textAlign: 'left',
                        color: 'black'
                      }}>
                      {item[0]}
                    </Text>
                  </View>

                  <View style={{width: '22%'}}>
                    <Text
                      style={{
                        fontFamily: font.fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        textAlign: 'left',
                        color: 'black'
                      }}>
                        {item[1].replace(/<br ?\/?>/g, "\n")}
                    </Text>
                  </View>

                  <View style={{width: '14%'}}>
                    <Text
                      style={{
                        fontFamily: font.fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        textAlign: 'left',
                        color: 'black'
                      }}>
                      {item[2]}
                    </Text>
                  </View>

                  <View style={{width: '14%'}}>
                    <Text
                      style={{
                        fontFamily: font.fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        textAlign: 'left',
                        color: 'black'
                      }}>
                      {item[3]}
                    </Text>
                  </View>

                  <View style={{width: '14%'}}>
                    <Text
                      style={{
                        fontFamily: font.fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        textAlign: 'left',
                        color: 'black'
                      }}>
                      {item[4]}
                    </Text>
                  </View>

                  <View style={{width: '14%'}}>
                    <Text
                      style={{
                        fontFamily: font.fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        textAlign: 'left',
                        color: 'black'
                      }}>
                      {item[5]}
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
                          uri: item[6],
                        })
                      }
                    />
                  </View>
                </View>
              </>
            ))}

            <RenderHtml contentWidth={width - 10} source={source} />

            <Text style={{...styles.label, marginTop: 10}}>
              For enquiries, please contact 01362 821048 or
              enquiries@falconcranes.co.uk
            </Text>
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

export default PowerGeneration;
