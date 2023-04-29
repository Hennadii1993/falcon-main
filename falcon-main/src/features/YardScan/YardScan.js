import * as React from 'react';
import {StyleSheet, Image, View, Text, ScrollView, Alert} from 'react-native';
import {colours, font} from '../../config';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';

const YardScan = ({route}) => {
  const navigation = useNavigation();

  const onSuccess = e => {
    console.log(e.data);

    scanner.reactivate();

    // Alert.alert('Code found', `You scanned ${e.data}`);
    navigation.navigate('YardAssetEdit', {
      assetBarcode: e.data,
    });
  };

  return (
    <ScrollView style={{flex: 1, padding: 5}}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontFamily: font.fontFamily,
              fontWeight: '400',
              textAlign: 'center',
              color: 'black'
            }}>
            Please scan your barcode below
          </Text>
        </View>
        <View>
          <QRCodeScanner
            ref={node => {
              this.scanner = node;
            }}
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker={true}
          />
        </View>
      </View>
    </ScrollView>
  );
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

export default YardScan;
