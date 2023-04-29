import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {colours, font, input} from '../../config';
import {usePostRequest} from '../../client';
import Loading from '../../components/Loading';
import {sendRequest} from '../../client';
import {useUserStore} from '../../store';

const HolidaySummaryDetails = ({route}) => {
  const navigation = useNavigation();

  const year = route.params.year;

  const User = useUserStore();

  const holidayDelete = async value => {
    const res = await sendRequest('/api/holidays-delete', User.token, {
      holidayID: value,
    });

    navigation.navigate('Dashboard', {});
  };

  const {status, data} = usePostRequest('/api/holidays-itemisation', {
    year: year,
  });

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.itemisation);
  }, [data]);

  if (status == 'fetching') {
    return <Loading />;
  }

  var today = new Date()
  today.setHours(0,0,0,0) 
  
  const ItemView = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
          
            (
              (item.holidayStatusID.includes(1) || item.holidayStatusID.includes(2)) 
            && (
              Math.floor(new Date((item.dateFromUnformatted)).getTime() >  
              Math.floor(new Date(today).getTime())
              )
            ))

              ? Alert.alert(
                  `Are you sure?`,
                  'This will cancel this holiday request',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('No Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        holidayDelete(item.holidayID);
                      },
                    },
                  ],
                )
              : null;
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column', flexGrow: 3}}>
              <View>
                <Text style={styles.titleStyle}>
                  {item.fromHalf > 0 ? item.dateFrom + ' (pm)' : item.dateFrom}
                  {' to '}
                  {item.toHalf > 0 ? item.dateTo + ' (am)' : item.dateTo}
                </Text>
              </View>

              <View>
                {item.days > 0 ? (
                  <Text style={styles.bodyStyle}>
                    {item.days} working day(s)
                  </Text>
                ) : null}
              </View>

              <View>
                {item.rejectReason ? (
                  <Text style={styles.bodyStyle}>{item.rejectReason}</Text>
                ) : item.holidayStatusID == 6 ? (
                  <Text style={styles.bodyStyle}>No reason given</Text>
                ) : null}
              </View>
            </View>

            <View style={{flex: 1}}>
              <Text
                style={{
                  ...styles.statusStyle,
                  textAlign: 'center',
                  backgroundColor: item.holidayStatusColour,
                  color: item.holidayStatusFont,
                  marginRight: 8,
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 5,
                  overflow: 'hidden',
                }}>
                {item.holidayStatusName}
              </Text>
            </View>
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
        <Text
          style={{
            fontWeight: '300',
            backgroundColor: 'white',
            width: '100%',
            textAlign: 'center',
            marginBottom: 5,
            marginTop: 5,
            ...styles.label,
          }}>
          Here are the holidays you have for <Text style={{...styles.label, fontWeight: '500'}}>{year}</Text>. {'\n'}You can cancel any holiday request in the future that is approved
          or pending by clicking on the request.
        </Text>

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

const styles = StyleSheet.create({
  titleStyle: {
    paddingLeft: 10,
    paddingTop: 7,
    fontWeight: '500',
    fontFamily: font.fontFamily,
    color: 'black'
  },
  bodyStyle: {
    paddingLeft: 10,
    paddingBottom: 7,
    fontWeight: '200',
    fontFamily: font.fontFamily,
    color: 'black'
  },
  statusStyle: {
    fontWeight: '500',
    fontFamily: font.fontFamily,
    marginTop: 7,
    color: 'black'
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
});

export default HolidaySummaryDetails;
