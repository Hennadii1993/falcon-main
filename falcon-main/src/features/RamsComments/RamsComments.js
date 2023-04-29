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

const RamsComments = ({route}) => {
  const navigation = useNavigation();

  const params = route.params;

  const {status, data} = usePostRequest('/api/rams-comments', {
    documentID: params.documentID,
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

            {item.isAmendment == 1 ? (
            <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: font.fontFamily,
                color: 'red',
                fontWeight: '200',
              }}
              onPress={() => getItem(item)}>
              This was an amendment
            </Text>
          </View>
            ) : null}

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
              dosplay: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <View
              style={{
                width: 150,
                padding: 10,
                borderRadius: 5,
                margin: 5,
                backgroundColor: '#fdc73e',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RamsCommentAdd', {
                    documentID: params.documentID,
                  });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'black'
                  }}>
                  Add Comment
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 150,
                padding: 10,
                borderRadius: 5,
                margin: 5,
                backgroundColor: '#fdc73e',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RamsAmendmentAdd', {
                    documentID: params.documentID,
                  });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'black'
                  }}>
                  Add Amendment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <NoResults title="No comments found" />

          <View
            style={{
              dosplay: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <View
              style={{
                width: 150,
                padding: 10,
                borderRadius: 5,
                margin: 5,
                backgroundColor: '#fdc73e',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RamsCommentAdd', {
                    documentID: params.documentID,
                  });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'black'
                  }}>
                  Add Comment
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 150,
                padding: 10,
                borderRadius: 5,
                margin: 5,
                backgroundColor: '#fdc73e',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RamsAmendmentAdd', {
                    documentID: params.documentID,
                  });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: font.fontFamily,
                    fontWeight: '400',
                    color: 'black'
                  }}>
                  Add Amendment
                </Text>
              </TouchableOpacity>
            </View>
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
  button: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    elevation: 3,
    width: 200,
    backgroundColor: '#fdc73e',
    fontFamily: font.fontFamily,
    marginBottom: 5,
    color: 'black'
  },
});

export default RamsComments;
