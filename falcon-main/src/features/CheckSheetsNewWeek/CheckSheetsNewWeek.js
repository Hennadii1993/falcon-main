import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {usePostRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';
import NoResults from '../../components/NoResults';

const CheckSheetsNewWeek = ({route}) => {
  const navigation = useNavigation();

  const linkID = route.params.linkID;

  const {status, data} = usePostRequest('/api/checklists', {
    linkID,
  });

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.start);
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
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}
                onPress={() => getItem(item)}>
                {item.start}
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

  const getItem = item => {
    navigation.navigate('CheckSheet', {
      date: item.date,
      linkID,
    });
  };

  if (status == 'fetched') {
    if (data?.start[0]?.date) {
      return (
        <>
          <View
            style={{
              padding: 10,
              width: '80%',
            }}>
            <Text style={{fontWeight: '400', fontFamily: font.fontFamily, fontSize: 16, color: 'black'}}>
              Choose Week
            </Text>
          </View>

          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </>
      );
    } else {
      return <NoResults title="No check sheets found" />;
    }
  }
};
export default CheckSheetsNewWeek;
