import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {usePostRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';

const PostOperationSubmitted = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/form-builder-submitted', {
    builderType: 'post_operation',
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
                {item.documentName}
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
    navigation.navigate('Document', {
      documentID: item.documentID,
      documentType: 'sites',
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

export default PostOperationSubmitted;
