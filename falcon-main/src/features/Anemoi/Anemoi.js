import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {usePostRequest} from '../../client';
import {Icon} from '@rneui/themed';
import NoResults from '../../components/NoResults';
import Loading from '../../components/Loading'
import {colours, font} from '../../config';


const Anemoi = () => {
  const {status, data} = usePostRequest('/api/windcrane', {});

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {

    if(data.count === 0) {
      return (<NoResults title="No data found" />)
    }

    return (
      <>
        <ScrollView style={{flex: 1, padding: 5}}>
          {data.results.map((item, key) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 5,
                margin: 8,
                key: `row${key}`
              }}>
              <View>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 15,
                    fontWeight: '500',
                    fontFamily: font.fontFamily,
                    key: `item${key}`,
                    color: 'black'
                  }}>
                  {item.siteName}
                </Text>
              </View>

              <View>
                {item.cranes.map((crane, key) => (
                  <>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 4,
                        justifyContent: 'space-between',
                        // fontWeight: '200',
                        fontFamily: font.fontFamily,
                        color: 'black'
                      }}
                      onPress={() =>
                        Linking.openURL(`maps://?q=${crane.coordinates}`)
                      }>
                    <View>
                      <Text>Crane Reference</Text>
                      <Text style={{fontSize: 11}}>{crane.craneSiteRef}</Text>
                    </View>
                    <View>
                      <Text>Stdev</Text>
                      <Text style={{fontSize: 11}}>{crane.stdev}</Text>
                    </View>
                    <View>
                      <Text>Max</Text>
                      <Text style={{fontSize: 11}}>{crane.max}</Text>
                    </View>
                    <View>
                      <Text>Avg</Text>
                      <Text style={{fontSize: 11}}>{crane.average}</Text>
                    </View>
                    <View>
                      <Text></Text>
                      <Icon
                        name="circle"
                        type="fontawesome"
                        color={crane.maxColour}
                      />
                    </View>
                    </TouchableOpacity>
                  </>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </>
    );
  }
};

export default Anemoi;
