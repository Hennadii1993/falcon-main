import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colours, font, input} from '../config';
import Loading from '../components/Loading';
import {useGetRequest} from '../client';
import {useState, useEffect} from 'react';

const ListYardComponents = props => {
  const navigation = useNavigation();

  const {status, data} = useGetRequest('/api/yard-components');

  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.results);
  }, [data]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.results.filter(function (item) {
        const allValues = item.componentNameNew + item.assetTypeName + item.assetID + item.componentName + item.assetBarcode;
        const itemData = allValues ? allValues.toUpperCase() : ''.toUpperCase();
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
      <>
        <TouchableOpacity onPress={() => getItem(item)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
            }}>
            <View>
              <Text style={{...styles.titleStyle, padding: 10}}>
                {item.componentName} {item.assetBarcode}
              </Text>
            </View>
            <View>
              <Text style={{...styles.addressStyle, marginRight: '5%'}}>
                {item.assetTypeName}
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
    navigation.navigate('YardAsset', {
      assetID: item.assetID,
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
  titleStyle: {
    fontWeight: '400',
    fontFamily: font.fontFamily,
    color: 'black',
  },
  addressStyle: {
    fontWeight: '200',
    fontFamily: font.fontFamily,
    color: 'black',
  },
});

export default ListYardComponents;
