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

const ListCranes = props => {
  const navigation = useNavigation();

  const {status, data} = useGetRequest('/api/cranes');
 
  const [search, setSearch] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(data.results);
  }, [data]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.results.filter(function (item) {

        const allValues = (item.thisSiteAddress + item.craneModel + item.craneReference + item.craneSerial)
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
          <Text style={styles.titleStyle}>
            {item.craneReference}
            {' / '}
            {item.craneSerial}
            {' / '}
            {item.craneModel}
          </Text>
          <Text style={styles.addressStyle}>
            {item.thisSiteAddress}
          </Text>
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
    // Function for click on an item

    if (props.page === 'AntiCollision') {
      navigation.navigate('AntiCollisionSignOffSheetForm', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'WorkInstructions') {
      navigation.navigate('WorkInstructionsCreateNewForm', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'SlewRingBoltSheet') {
      navigation.navigate('SlewRingBoltSheetForm', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'LoadTest') {
      navigation.navigate('LoadTestCertificateForm', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'ServiceWorksheet') {
      navigation.navigate('ServiceWorksheetForm', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'PostOperation') {
      navigation.navigate('PostOperationForm', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'TimeSheetsOperation') {
      navigation.navigate('TimeSheetsOperation', {
        linkID: item.linkID,
      });
    }
    if (props.page === 'CheckSheets') {
      navigation.navigate('CheckSheetsNewWeek', {
        linkID: item.linkID,
      });
    }

    


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
    paddingLeft: 10,
    paddingTop: 7,
    fontWeight: '400',
    fontFamily: font.fontFamily,
    color: 'black'
  },
  addressStyle: {
    paddingLeft: 10,
    paddingBottom: 7,
    fontWeight: '200',
    fontFamily: font.fontFamily,
    color: 'black'
  },
});

export default ListCranes;
