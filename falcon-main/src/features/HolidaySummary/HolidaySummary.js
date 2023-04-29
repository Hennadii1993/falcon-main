import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colours, font, input} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePostRequest} from '../../client';

const HolidaySummary = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/holidays', {});

  if (status == 'fetched') {
    return (
      <KeyboardAwareScrollView>
        {data.summary.map((year, key) => (
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => {
              navigation.navigate('HolidaySummaryDetails', {
                year: year.year,
              });
            }}>
            <>
              <View
                style={{
                  ...styles.headerContainer,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.headerText}>{year.year}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      ...styles.headerText,
                      textAlign: 'right',
                      paddingRight: 15,
                      fontFamily: font.fontFamily,
                      fontSize: 15,
                      color: 'black',
                    }}>
                    See Days
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 375,
                    padding: 6,
                    // borderColor: 'green',
                    // borderWidth: 1,
                  }}>
                  <View>
                    <Text style={{...styles.label, marginLeft: 15}}>Entitlement</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        backgroundColor: '#ECEFF0',
                        borderRadius: 8,
                        borderColor: 'white',
                        borderWidth: 1,
                        width: 32,
                        borderColor: 'black',
                        borderWidth: 1,
                        textAlign: 'center',
                        overflow: 'hidden',
                      }}>
                      {year.entitlement}
                    </Text>
                  </View>

                  <View>
                    <Text style={{...styles.label, paddingLeft: 10}}>
                      Pending
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        backgroundColor: '#f78181',
                        borderRadius: 8,
                        borderColor: 'black',
                        borderWidth: 1,
                        width: 32,
                        textAlign: 'center',
                        overflow: 'hidden',
                      }}>
                      {year.pending}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 6,
                    width: '75%',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={styles.label}>Approved</Text>
                  <Text
                    style={{
                      backgroundColor: '#bef781',
                      borderRadius: 8,
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 32,
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}>
                    {year.approved}
                  </Text>

                  <Text style={{...styles.label, paddingLeft: 10}}>
                    Compulsory
                  </Text>
                  <Text
                    style={{
                      backgroundColor: '#ff8000',
                      borderRadius: 8,
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 32,
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}>
                    {year.compulsory}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 6,
                    width: '75%',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={styles.label}>Remaining</Text>
                  <Text
                    style={{
                      backgroundColor: '#a2d2e2',
                      borderRadius: 8,
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 32,
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}>
                    {year.remaining}
                  </Text>

                  <Text style={{...styles.label, paddingLeft: 10}}>Unpaid</Text>
                  <Text
                    style={{
                      backgroundColor: '#f6a9f2',
                      borderRadius: 8,
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 32,
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}>
                    {year.unpaid}
                  </Text>
                </View>
              </View>
            </>
          </TouchableOpacity>
        ))}
      </KeyboardAwareScrollView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  label: {
    fontFamily: font.fontFamily,
    fontSize: 17,
    fontWeight: '300',
    width: 135,
    color: 'black',
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  headerContainer: {
    backgroundColor: '#e5e5e5',
    marginTop: 1,
    width: '100%',
  },
  headerText: {
    color: 'black',
    padding: 3,
    margin: 4,
    width: '100%',
  },
  timeInput: {
    height: 70,
    width: 80,
    margin: 3,
    backgroundColor: '#fff',
    borderColor: '#C8C8C8',
    borderWidth: 0.5,
    paddingLeft: 20,
    fontWeight: '400',
    fontFamily: font.fontFamily,
    justifyContent: 'center',
    color: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    elevation: 3,
    width: 200,
    backgroundColor: '#e5e5e5',
    fontFamily: font.fontFamily,
    color: 'black',
  },
});

export default HolidaySummary;
