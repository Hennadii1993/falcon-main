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

const SiteRecordsViewSkills = ({route}) => {
  const navigation = useNavigation();

  const siteID = route.params.siteID;

  const {status, data} = usePostRequest('/api/site-records-crew', {
    siteID,
  });

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
                      fontWeight: '400',
                      fontFamily: font.fontFamily,
                      fontSize: 15,
                      padding: 7,
                      color: 'black'
                    }}>
                    {item.categoryName}
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
                {item.docs.map((doc, key) => (
                  <Text
                    onPress={() =>
                      navigation.navigate('Document', {
                        documentID: doc.documentID,
                        documentType: 'skill',
                      })
                    }
                    style={{
                      fontWeight: '400',
                      fontFamily: font.fontFamily,
                      fontSize: 15,
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

export default SiteRecordsViewSkills;
