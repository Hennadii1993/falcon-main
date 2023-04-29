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

const CheckSheetsPending = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const {status, data} = usePostRequest('/api/checklists-pending', {});

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLink, setSelectedLink] = useState('');

  const actionSheetRef = useRef(null);
  const actionSheetRefTwo = useRef(null);

  function secondSheet() {
    actionSheetRefTwo.current.show();
  }

  useEffect(() => {
    setFilteredDataSource(data.pending);
  }, [data]);

  if (status == 'fetching') {
    return <Loading />;
  }

  const checksheetDeleteConfirm = async value => {
    const res = await sendRequest('/api/checklists-delete', User.token, {
      date: value,
      linkID: selectedLink,
    });
    navigation.navigate('Dashboard', {});
  };

  function checksheetDelete(date, linkID) {
    Alert.alert(
      `Are you sure?`,
      'This will permanently delete the check sheet.',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            checksheetDeleteConfirm(date, linkID);
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
            setSelectedDate(item.checklistWeek);
            setSelectedLink(item.linkID);
            actionSheetRef.current.show();
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              justifyContent: 'space-evenly',
              alignItems: 'stretch',
            }}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}>
                WEEK
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  color: 'black'
                }}>
                {item.start}
              </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}>
                TC NO.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  color: 'black'
                }}>
                {item.craneReference}
              </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}>
                SERIAL NO.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  color: 'black'
                }}>
                {item.craneSerial}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              backgroundColor: 'white',
              justifyContent: 'space-evenly',
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
              }}>
              S
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataMon ? 'orange' : 'black',
              }}>
              M
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataTue ? 'orange' : 'black',
              }}>
              T
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataWed ? 'orange' : 'black',
              }}>
              W
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataThu ? 'orange' : 'black',
              }}>
              T
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: item.checklistDataFri ? 'orange' : 'black',
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
                  color: 'grey',
                }}>
                Document options
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
                secondSheet();
              }}>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'grey',
                  }}>
                  Make changes
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current.hide();
                checksheetDelete(selectedDate, selectedLink);
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
                    color: 'grey',
                  }}>
                  Delete this check sheet
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
                navigation.navigate('CheckSheetsComments', {
                  date: selectedDate,
                  linkID: selectedLink,
                });
              }}>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'grey',
                  }}>
                  Add comments / defects
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
                navigation.navigate('CheckSheetSubmit', {
                  linkID: selectedLink,
                  date: selectedDate,
                });
              }}>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'grey',
                  }}>
                  Submit check sheet
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
                color: 'grey',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>

          <ActionSheet
            style={{
              margin: 10,
            }}
            ref={actionSheetRefTwo}>
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
                    color: 'grey',
                  }}>
                  Which day would you like to update?
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataSat',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Saturday
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataSun',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Sunday
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataMon',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Monday
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataTue',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Tuesday
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataWed',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Wednesday
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataThu',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Thursday
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
                  actionSheetRefTwo.current.hide();
                  actionSheetRef.current.hide();
                  navigation.navigate('CheckSheetDay', {
                    date: selectedDate,
                    linkID: selectedLink,
                    day: 'checklistDataFri',
                  });
                }}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      color: 'grey',
                    }}>
                    Update Friday
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                // actionSheetRefTwo.current.hide()
              }}
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
                  color: 'grey',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </ActionSheet>
        </ActionSheet>
      </>
    );
  }
};

export default CheckSheetsPending;
