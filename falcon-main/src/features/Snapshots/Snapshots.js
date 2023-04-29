import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {usePostRequest} from '../../client';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../store';
import NoResults from '../../components/NoResults';
import Loading from '../../components/Loading'
import {colours, font} from '../../config';


const Snapshots = ({route}) => {
  const navigation = useNavigation();
  const User = useUserStore();

  const {status, data} = usePostRequest('/api/snapshots', {
    customerID: User.me.customerID,
  });

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {

    if(data.count === 0) {
      return (<NoResults title="No Snapshots found" />)
    }

    else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View>
            {data.results.map((snapshot, key) => (
              <>
                <Text
                  onPress={() =>
                    navigation.navigate('Document', {
                      documentID: snapshot.snapshotID,
                      documentType: 'snapshots',
                    })
                  }
                  style={{
                    fontWeight: '500',
                    fontFamily: font.fontFamily,
                    marginLeft: 10,
                    marginTop: 3,
                    padding: 7,
                    color: 'black'
                  }}>
                  {snapshot.snapshotName}
                </Text>
                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                  }}
                />
              </>
            ))}
          </View>
        </SafeAreaView>
      );
    }
  }
};

export default Snapshots;
