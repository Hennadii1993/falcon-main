import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useGetRequest} from '../../client';
import {Icon} from '@rneui/themed';
import Loading from '../../components/Loading';
import {colours, font, input} from '../../config';

const SiteRecords = () => {
  const navigation = useNavigation();
  const {status, data} = useGetRequest('/api/contacts');

  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.results);
  }, [data]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.results.filter(function (item) {
        const itemData = item.contactName
          ? item.contactName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data.results);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <>
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
                fontSize: 18,
                fontFamily: font.fontFamily,
                color: 'black',
              }}>
              {item.contactName}
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: 'black',
              }}>
              {item.contactTitle}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
              paddingLeft: 10,
            }}>
            {/* <Icon
              style={{marginRight: 20}}
              name="email"
              color="black"
              onPress={() => Linking.openURL(`mailto:${item.contactEmail}`)}
            /> */}
            <Icon
              name="mail"
              type="feather"
              color="black"
              width="100%"
              size={20}
              style={{marginRight: 10}}
              onPress={() => Linking.openURL(`mailto:${item.contactEmail}`)}
            />

            {/* <Icon
              style={{marginRight: 10}}
              name="phone"
              color="black"
              onPress={() => Linking.openURL(`tel:${item.contactPhone}`)}
            /> */}
            <Icon
              name="phone-call"
              type="feather"
              color="black"
              width="100%"
              size={20}
              style={{marginRight: 10}}
              onPress={() => Linking.openURL(`tel:${item.contactPhone}`)}
            />
          </View>
        </View>
      </>
    );
  };

  if (status == 'fetching') {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TextInput
        style={input.search}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
        placeholderTextColor={input.placeHolderColor}
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
};

export default SiteRecords;
