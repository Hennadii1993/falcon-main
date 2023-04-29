import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {usePostRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';
import NoResults from '../../components/NoResults';
import ActionSheet from 'react-native-actions-sheet';

const YardLoading = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/loading', {});

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.results);
  }, [data]);

  if (status == 'fetching') {
    return <Loading />;
  }

  const ItemView = ({item}) => {
    return (
      <>
        <TouchableOpacity onPress={() => console.log(item.customerName)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10,
              width: '90%',
            }}
            key={item.key}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: font.fontFamily,
                  fontSize: 14,
                  fontWeight: '400',
                  color: 'black'
                }}>
                {item.customerName}
              </Text>
              <Text
                style={{
                  fontFamily: font.fontFamily,
                  fontSize: 14,
                  fontWeight: '300',
                  color: 'black'
                }}>
                {item.siteName}
              </Text>
              <Text
                style={{
                  fontFamily: font.fontFamily,
                  fontSize: 14,
                  fontWeight: '300',
                  color: 'black'
                }}>
                {item.craneErectionDate}
              </Text>
            </View>
            <View>
              <Text>{item.progress_todo}</Text>
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
export default YardLoading;
