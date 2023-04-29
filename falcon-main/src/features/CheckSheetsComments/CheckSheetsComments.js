import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {usePostRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Loading from '../../components/Loading';
import {colours, font, input} from '../../config';
import NoResults from '../../components/NoResults';
import {WebView} from 'react-native-webview';

const CheckSheetsComments = ({route}) => {
  const navigation = useNavigation();

  const params = route.params;

  const {status, data} = usePostRequest('/api/checklist-comments', {
    date: params.date,
    linkID: params.linkID
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
              flexDirection: 'column',
              padding: 10,
              backgroundColor: 'white',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}
                onPress={() => getItem(item)}>
                {item.name}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  color: 'black'
                }}
                onPress={() => getItem(item)}>
                {item.commentDate}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.fontFamily,
                  fontWeight: '300',
                  color: 'black'
                }}
                onPress={() => getItem(item)}>
                {item.commentBody}
              </Text>
            </View>

            <View>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                style={{height: 200, width: '100%', margin: 5}}
              />
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
    // navigation.navigate('TimeSheetField', {
    //   date: item.date,
    // });
  };

  if (status == 'fetched') {
    if (data.count > 0) {
      return (
        <>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />

          <View
            style={{
              alignItems: 'center',
              marginBottom: 30,
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <TouchableOpacity
              style={input.button}
              onPress={() => {
                navigation.navigate('CheckSheetsCommentAdd', {
                  date: params.date,
                  linkID: params.linkID,
                });
              }}>
              <Text style={{fontFamily: font.fontFamily, fontWeight: '400', color: 'black'}}>
                Add Comment
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <>
          <NoResults title="No comments found" />

          <View
            style={{
              alignItems: 'center',
              marginBottom: 30,
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <TouchableOpacity
              style={input.button}
              onPress={() => {
                navigation.navigate('CheckSheetsCommentAdd', {
                  date: params.date,
                  linkID: params.linkID,
                });
              }}>
              <Text style={{fontFamily: font.fontFamily, fontWeight: '400', color: 'black'}}>
                Add Comment
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});

export default CheckSheetsComments;
