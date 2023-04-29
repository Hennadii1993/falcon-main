import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useGetRequest} from '../../client';
import {Icon} from '@rneui/themed';
import Loading from '../../components/Loading';
import {colours, font, input} from '../../config';
import {Button} from '@rneui/themed';

const ContactUs = () => {
  const navigation = useNavigation();
  const {status, data} = useGetRequest('/api/contact');

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
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: font.fontFamily,
                color: 'black'
              }}>
              {item.contactTitle}
            </Text>
            <Text
              style={{
                fontFamily: font.fontFamily,
                color: 'black'
              }}>
              {item.contactAddress}
            </Text>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() =>
                        Linking.openURL(`maps://?q=${item.contactGoogle}`)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: '#fdc73e',
                    width: 100,
                  }}>
                  <View>
                    <Text style={{...styles.titleStyle, padding: 10}}>
                      DIRECTIONS
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.contactPhone}`) }>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: '#fdc73e',
                    width: 100,
                    alignItems: 'center',
                    marginLeft: 10
                  }}>
                  <View>
                    <Text style={{...styles.titleStyle, padding: 10, paddingLeft: 30}}>
                      CALL
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.contactEmail}`) }>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: '#fdc73e',
                    width: 100,
                    marginLeft: 10
                  }}>
                  <View>
                    <Text style={{...styles.titleStyle, padding: 10, paddingLeft: 25}}>
                      EMAIL
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
              paddingLeft: 10,
            }}>
            <Icon style={{marginRight: 20}} name="email" color="black" onPress={() => Linking.openURL(`mailto:${item.contactEmail}`) } />
            <Icon style={{marginRight: 10}} name="phone" color="black" onPress={() => Linking.openURL(`tel:${item.contactPhone}`) }/>
          </View> */}
        </View>
      </>
    );
  };

  if (status == 'fetching') {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
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
    color: 'black'
  },
  addressStyle: {
    fontWeight: '200',
    fontFamily: font.fontFamily,
    color: 'black'
  },
});

export default ContactUs;
