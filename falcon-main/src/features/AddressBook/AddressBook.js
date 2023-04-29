import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {usePostRequest, sendRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';
import {useUserStore} from '../../store';

const AddressBook = ({route}) => {
  const navigation = useNavigation();

  const User = useUserStore();

  const [toggle, setToggle] = useState(false);

  const {status, data} = usePostRequest(
    '/api/address-book' + '?focus=' + toggle,
    {},
  );

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const deleteEmail = async value => {
    const res = await sendRequest('/api/address-book-remove', User.token, {
      email: value,
    });
    setToggle(!toggle)
  };

  useEffect(() => {
    setFilteredDataSource(data.results);
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
                {item}
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

    Alert.alert(
      `Are you sure?`,
      'This will permanently delete the email from your address book.',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteEmail(item);
          },
        },
      ],
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
      </>
    );
  }
};

export default AddressBook;
