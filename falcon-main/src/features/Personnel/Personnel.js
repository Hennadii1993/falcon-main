import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePostRequest} from '../../client';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colours, font} from '../../config';
import Loading from '../../components/Loading';

const Personnel = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest('/api/personnel-documents');

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    return (
      <>
        <ScrollView style={{flex: 1, padding: 5}}>
          {data.results.map((item, key) => (
            <Collapse style={styles.itemStyle}>
              <CollapseHeader>
                <View>
                  <Text
                    style={{
                      fontFamily: font.fontFamily,
                      fontWeight: '400',
                      fontSize: 15,
                      padding: 7,
                      color: 'black'
                    }}>
                    {item.category}
                  </Text>
                </View>
                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                  }}
                />
              </CollapseHeader>
              <CollapseBody>
                {item.documents.map((doc, key) => (
                  <Text
                    onPress={() =>
                      navigation.navigate('DocumentViewer', {
                          documentHash: doc.documentHash,
                          isPDF: doc.isPDF
                      })
                    }
                    style={{
                      fontWeight: '400',
                      fontFamily: font.fontFamily,
                      color: '#7f7f7f',
                      marginLeft: 10,
                      marginTop: 3,
                      padding: 5,
                      color: 'black'
                    }}>
                    {doc.documentName}
                  </Text>
                ))}
              </CollapseBody>
            </Collapse>
          ))}
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  itemStyle: {
    paddingLeft: 5,
    paddingTop: 5,
  },
});

export default Personnel;
