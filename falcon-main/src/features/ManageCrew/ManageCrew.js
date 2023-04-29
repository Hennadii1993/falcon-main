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

const ManageCrew = ({route}) => {
  const navigation = useNavigation();

  const params = route.params;

  const {status, data} = usePostRequest('/api/rams-crew', {
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
                {item.crewName}
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
                {item.crewCompany} / {item.crewCategoryName}
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
                {item.crewDate}
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
                  navigation.navigate('ManageCrewAdd', {
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
                  Add Crew Member
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <NoResults title="There are no crew members" />

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
                  navigation.navigate('ManageCrewAdd', {
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
                  Add Crew Member
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

export default ManageCrew;
