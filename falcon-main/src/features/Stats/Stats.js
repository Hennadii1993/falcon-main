import * as React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {usePostRequest} from '../../client';
import Loading from '../../components/Loading'
import {colours, font} from '../../config';


const Stats = ({route}) => {
  const {status, data} = usePostRequest('/api/stats.php', {});

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    return (
      <ScrollView style={{flex: 1, padding: 5}}>
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: '700',
              fontFamily: font.fontFamily,
              fontSize: 20,
              color: 'black'
            }}>
            Company Average
          </Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `https://chart.googleapis.com/chart?cht=p&chs=500x500&chd=t:${data.fleet.fleetPieGood},${data.fleet.fleetPieLost}&chco=04B45F,FF0000`,
            }}
          />
          <Text
            style={{
              fontWeight: '700',
              fontFamily: font.fontFamily,
              paddingTop: 10,
              color: 'black'
            }}>
            {data.fleet.fleetHours} hours worked / {data.fleet.fleetLost} hours
            downtime ({data.fleet.fleetPieLost}%)
          </Text>

          <View style={styles.lineStyle} />

          {data.stats.map((item, key) => (
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontFamily: font.fontFamily,
                  fontSize: 20,
                  paddingTop: 15,
                  paddingBottom: 10,
                  color: 'black'
                }}>
                {item.site.siteName}
              </Text>

              {item.cranes.length ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {item.cranes.map((crane, key) => (
                    <>
                      <Image
                        style={styles.craneLogo}
                        source={{
                          uri: `https://chart.googleapis.com/chart?cht=p&chs=500x500&chd=t:${crane.performance.pieGood},${crane.performance.pieLost}&chco=04B45F,FF0000`,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          fontFamily: font.fontFamily,
                          fontSize: 12,
                          paddingTop: 4,
                          color: 'black'
                        }}>
                        {crane.craneSiteRef}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontFamily: font.fontFamily,
                          fontSize: 12,
                          paddingTop: 3,
                          color: 'black'
                        }}>
                        {crane.craneModel}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontFamily: font.fontFamily,
                          fontSize: 12,
                          paddingTop: 3,
                          color: 'black'
                        }}>
                        Hours downtime - {crane.performance.lostHours} (
                        {crane.performance.pieLost}%) out of{' '}
                        {crane.performance.totalHours} worked
                      </Text>
                    </>
                  ))}
                </View>
              ) : (
                <Text
                  style={{
                    fontWeight: '700',
                    fontFamily: font.fontFamily,
                    color: 'red',
                    fontSize: 12,
                    align: 'center',
                    textAlign: 'center',
                    paddingTop: 5,
                  }}>
                  NO CRANES FOUND
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  craneLogo: {
    width: 75,
    height: 75,
  },
  logo: {
    width: 66,
    height: 58,
  },
  lineStyle: {
    borderWidth: 0.4,
    borderColor: 'black',
    margin: 10,
    width: '100%',
  },
});

export default Stats;
