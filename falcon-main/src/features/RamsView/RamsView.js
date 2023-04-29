import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {useState, useEffect} from 'react';
import {colours, font, input} from '../../config';
import Loading from '../../components/Loading';

const RamsView = ({route}) => {
  const navigation = useNavigation();

  const siteID = route.params.siteID;

  const {status, data} = usePostRequest('/api/rams', {
    siteID,
  });

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.results);
  }, [data]);

  if (status == 'fetching') {
    return <Loading />;
  }

  const ItemView = ({item}) => {
    return (
      // Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.ramsName}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Separator
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
    navigation.navigate('Document', {
      documentID: item.ramsID,
      documentType: item.fileType,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
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

export default RamsView;
