import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {usePostRequest} from '../../client';
import {useState, useEffect, useRef} from 'react';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import {useNavigation} from '@react-navigation/native';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const TimeSheetsFieldPending = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const {status, data} = usePostRequest('/api/timesheets-pending-field', {});

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [selectedDate, setSelectedDate] = useState('');

  const actionSheetRef = useRef(null);

  useEffect(() => {
    setFilteredDataSource(data.pending);
  }, [data]);

  if (status == 'fetching') {
    return <Loading />;
  }

  const timesheetDelete = async value => {
    const res = await sendRequest('/api/timesheet-delete-field', User.token, {
      date: value,
    });

    navigation.navigate('Dashboard', {});
  };

  function timesheetFieldDelete(date) {
    Alert.alert(
      `Are you sure?`,
      'This will permanently delete the timesheet.',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            timesheetDelete(date);
          },
        },
      ],
    );
  }

  const ItemView = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setSelectedDate(item.timesheetWeek);
            actionSheetRef.current.show();
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: font.fontFamily,
                fontWeight: '400',
                color: 'black'
              }}>
              {item.start}
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.sat ? 'orange' : 'black',
              }}>
              S
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.sun ? 'orange' : 'black',
              }}>
              S
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.mon ? 'orange' : 'black',
              }}>
              M
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.tue ? 'orange' : 'black',
              }}>
              T
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.wed ? 'orange' : 'black',
              }}>
              W
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.thu ? 'orange' : 'black',
              }}>
              T
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.fri ? 'orange' : 'black',
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

  if (status == 'fetched') {
    return (
      <>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
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
                  color: 'grey'
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
                navigation.navigate('TimeSheetField', {date: selectedDate});
              }}>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'grey'
                  }}>
                  Update time sheet
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current.hide();
                timesheetFieldDelete(selectedDate);
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
                    color: 'grey'
                  }}>
                  Delete this time sheet
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
                navigation.navigate('TimeSheetFieldComments', {date: selectedDate});
              }}>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'grey'
                  }}>
                  Add comments
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
                navigation.navigate('TimeSheetFieldSubmit', {
                  date: selectedDate,
                });
              }}>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'grey'
                  }}>
                  Submit time sheet
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
                color: 'grey'
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </ActionSheet>
      </>
    );
  }
};

export default TimeSheetsFieldPending;
