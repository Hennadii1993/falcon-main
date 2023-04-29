import * as React from 'react';
import {Text, SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import Loading from '../../components/Loading';
import {WebView} from 'react-native-webview';
import Pdf from 'react-native-pdf';

const RiskAssessmentView = ({route}) => {

    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <WebView source={{uri: route.params.uri}} style={{marginTop: 20}} />
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'w',
    flex: 1,
  },
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

export default RiskAssessmentView;
