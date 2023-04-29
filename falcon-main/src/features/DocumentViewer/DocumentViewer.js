import * as React from 'react';
import {Text, SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import Loading from '../../components/Loading';
import {WebView} from 'react-native-webview';
import Pdf from 'react-native-pdf';

const DocumentViewer = ({route}) => {
  const navigation = useNavigation();

  const documentHash = route.params.documentHash;
  const isPDF = route.params.isPDF;

  const {status, data} = usePostRequest('/api/personnel-documents-url', {
    documentHash,
  });

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched' && !isPDF) {
    console.log(data.url)
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <WebView source={{uri: data.url}} style={{marginTop: 20}} />
        </View>
      </View>
    );
  }

  if (status == 'fetched' && isPDF) {
    navigation.navigate('PDFviewer', {
      uri: data.url,
    });
  }
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'w',
    flex: 1,
  },
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

export default DocumentViewer;
