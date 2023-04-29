import * as React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {colours, font, input} from '../../config';
import Pdf from 'react-native-pdf';

const PDFviewer = ({route}) => {

  console.log('uri')


  const link = route.params.uri;

  const source = {
    uri: link,
    cache: true,
  };

  return (
    <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={true}>
      <View style={styles.mainContainer}>
        <>
          <View style={{width: '110%'}}>
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              trustAllCerts={false}
              style={styles.pdf}
            />
          </View>
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  label: {
    fontFamily: font.fontFamily,
    fontSize: 14,
    width: '100%',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
    fontFamily: font.fontFamily,
    color: 'black'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFviewer;
