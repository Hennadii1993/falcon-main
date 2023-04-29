import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {usePostRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';
import {Icon} from '@rneui/themed';

const CheckSheetsSubmitted = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/checklists-completed', {});

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.completed);
  }, [data]);

  if (status == 'fetching') {
    return <Loading />;
  }

  const ItemView = ({item}) => {
    return (
      <>
        <TouchableOpacity onPress={() => getItem(item)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}>
                COMPLETED
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: font.fontFamily,
                  color: 'black'
                }}
                onPress={() => getItem(item)}>
                {item.checklistSubmittedDate_Only}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  marginTop: 5,
                  color: 'black'
                }}>
                WEEK
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: font.fontFamily,
                  color: 'black'
                }}>
                {item.start}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}>
                TIME
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  color: 'black'
                }}>
                {item.checklistSubmittedTime_Only}
              </Text>
            </View>


            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}>
                TC NO
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: font.fontFamily,
                  color: 'black'
                }}
                onPress={() => getItem(item)}>
                {item.craneReference}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  marginTop: 5,
                  color: 'black'
                }}>
                SERIAL NO
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: font.fontFamily,
                  color: 'black'
                }}>
                {item.craneSerial}
              </Text>
            </View>


            <View>
              <Icon name="file-text" type="feather" color="grey" />
            </View>
          </View>



          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 5,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
            }}>
            
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataSat ? 'orange' : 'black',
              }}>
              S
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataSun ? 'orange' : 'black',
                marginLeft: 20,

              }}>
              S
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataMon ? 'orange' : 'black',
                marginLeft: 20,
              }}>
              M
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataTue ? 'orange' : 'black',
                marginLeft: 20,
              }}>
              T
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataWed ? 'orange' : 'black',
                marginLeft: 20,
              }}>
              W
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataThu ? 'orange' : 'black',
                marginLeft: 20,
              }}>
              T
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataFri ? 'orange' : 'black',
                marginLeft: 20,
                marginRight: 20,
              }}>
              F
            </Text>
          </View>


        </TouchableOpacity>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    navigation.navigate('Document', {
      documentID: item.documentID,
      documentType: 'sites',
    });
  };

  if (status == 'fetched') {
    return (
      <>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </>
    );
  }
};

export default CheckSheetsSubmitted;
