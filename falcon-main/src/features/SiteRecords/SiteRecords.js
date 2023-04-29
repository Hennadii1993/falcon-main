import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useGetRequest} from '../../client';
import Loading from '../../components/Loading'
import {colours, font, input} from '../../config';

const SiteRecords = () => {
  const navigation = useNavigation();
  const {status, data} = useGetRequest('/api/sites');

  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.results);
  }, [data]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.results.filter(function (item) {
        const itemData = item.siteName
          ? item.siteName.toUpperCase()
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
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.siteName}
        {' - '}
        {item.cranesList}
      </Text>
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
    // Function for click on an item
    navigation.navigate('SiteRecordsView', {
      siteID: item.siteID,
    });
  };

  if (status == 'fetching') {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
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
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    fontWeight: '400',
    fontSize: 15,
    fontFamily: font.fontFamily,
    color: 'black'
  },
});

export default SiteRecords;
