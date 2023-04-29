import * as React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {ScrollView} from 'react-native-gesture-handler';
import NoResults from '../../components/NoResults';
import Loading from '../../components/Loading';
import {colours, font} from '../../config';

const OrderFormsCompleted = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/order-forms-submitted', {});

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    if (data.count === 0) {
      return <NoResults title="No completed order forms found" />;
    }

    return (
      <>
        <ScrollView style={{flex: 1, padding: 5}}>
          {data.results.map((item, key) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 10,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: font.fontFamily,
                  fontWeight: '400',
                  color: 'black'
                }}
                onPress={() =>
                  navigation.navigate('Document', {
                    documentID: item.documentID,
                    documentType: 'sites',
                  })
                }
                >
                {item.documentName}
              </Text>
            </View>
          ))}
        </ScrollView>
      </>
    );
  }
};

export default OrderFormsCompleted;
