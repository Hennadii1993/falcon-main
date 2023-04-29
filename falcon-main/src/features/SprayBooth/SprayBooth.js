import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {colours, font, input} from '../../config';
import {usePostRequest} from '../../client';
import {useUserStore} from '../../store';
import Loading from '../../components/Loading';

const SprayBooth = ({route}) => {
  const navigation = useNavigation();

  const {status, data} = usePostRequest(
    '/api/external.php?action=spray-booth',
    {},
  );

  const [scrollEnabled, setScrollEnabled] = useState(true);

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    return (
      <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={scrollEnabled}>
        <View style={styles.mainContainer}>
          <>
            <>
              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                  fontSize: 17,
                }}>
                SPRAY BOOTH
              </Text>
              <Text style={styles.label}>
                Falcon we recognise the importance of having not just a strong
                product and a comprehensive service, but also an identifiable
                company image. With this in mind, we have invested in 2 shot
                blast booths and 5 spray booths across our depots in Shipdham
                and Manchester.
              </Text>

              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  borderWidth: 0.4,
                  borderColor: 'grey',
                }}>
                <Image
                  source={{
                    uri: `https://www.falconcranes.co.uk/images/services/spray-booth/falcon-cranes-spray-booth-before-opt.jpg`,
                  }}
                  style={{
                    height: 160,
                    width: '100%',
                    margin: 1,
                    marginLeft: '1%',
                  }}
                />
              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  borderWidth: 0.4,
                  borderColor: 'grey',
                }}>
                <Image
                  source={{
                    uri: `https://www.falconcranes.co.uk/images/services/spray-booth/falcon-cranes-spray-booth-3.jpg`,
                  }}
                  style={{
                    height: 160,
                    width: '100%',
                    margin: 1,
                    marginLeft: '1%',
                  }}
                />
              </View>

              <View style={{width: '100%'}}>
                  <Text
                    style={{
                      ...styles.label,
                      fontSize: 20,
                      color: 'black',
                      fontWeight: '400',
                      textAlign: 'left',
                    }}>
                    Before
                  </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  borderWidth: 0.4,
                  borderColor: 'grey',
                }}>
                <Image
                  source={{
                    uri: `https://www.falconcranes.co.uk/images/services/spray-booth/falcon-cranes-spray-booth-after-opt.jpg`,
                  }}
                  style={{
                    height: 160,
                    width: '100%',
                    margin: 1,
                    marginLeft: '1%',
                  }}
                />
              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  borderWidth: 0.4,
                  borderColor: 'grey',
                }}>
                <Image
                  source={{
                    uri: `https://www.falconcranes.co.uk/images/services/spray-booth/falcon-cranes-spray-booth-2.jpg`,
                  }}
                  style={{
                    height: 160,
                    width: '100%',
                    margin: 1,
                    marginLeft: '1%',
                  }}
                />
              </View>

              <View style={{width: '100%'}}>
                  <Text
                    style={{
                      ...styles.label,
                      fontSize: 20,
                      color: 'black',
                      fontWeight: '400',
                      textAlign: 'left',
                    }}>
                    After
                  </Text>
              </View>

              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                  fontSize: 17,
                }}>
                Shot Blast Booths
              </Text>

              <Text style={styles.label}>
                The shot blast booths use G12 iron grit which is recycled on a
                corkscrew system enabling us to use the grit for up to 200
                operations - making this system very efficient and
                environmentally friendly. The system is accredited to achieving
                SA3 white metal standard.
              </Text>

              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                  fontSize: 17,
                }}>
                Spray Booths
              </Text>

              <Text style={styles.label}>
                The spray booths are complete with the latest, state of the art,
                electro-static equipment and conventional HVLP painting
                equipment. This equipment enables us to reduce wastage and
                maintain a low VOC. The paint used is a marine based paint which
                has a high zinc phosphate content and is 100% lead free. Three
                of the booths are located in an old World War II aircraft hangar
                on Shipdham Airfield, which includes a 20t overhead rail mounted
                gantry crane and the other two are in our northern depot at
                Birch.
              </Text>

              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                  fontSize: 17,
                }}>
                The Cranes
              </Text>

              <Text style={styles.label}>
                The advantages of offering respraying to our customers are two
                fold. The first and most important is for health and safety
                reasons. Any tower crane in our fleet can be shot blasted to its
                bare metal allowing our engineers to thoroughly inspect and
                carry out non-destructive testing (NDT) procedures on the
                structure before it is resprayed. By adding layer upon layer of
                paint without shot blasting, the risk can increase of structural
                damage going unnoticed. The second benefit is the appearance of
                the finished product meaning that we can supply any tower crane
                in our fleet in our customers own livery. Once a machine has
                been through our booths, the result is an extremely high-grade
                product – perfect for any prestigious project.
              </Text>

              <Text
                style={{
                  fontWeight: '400',
                  ...styles.label,
                  fontSize: 17,
                }}>
                What else can we do?
              </Text>

              <Text style={styles.label}>
                With the facilities Falcon have available, we can blast, repair
                and respray almost any piece of equipment. This includes
                construction equipment, heavy industrial plant, lifting
                accessories, site accommodation, containers and many, many more.
              </Text>

              <View style={{width: '100%'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ContactUs')}>
                  <Text
                    style={{
                      ...styles.label,
                      fontSize: 15,
                      color: '#fdc73e',
                      fontWeight: '600',
                      textAlign: 'left',
                    }}>
                    CONTACT US
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>
                For enquiries, please contact 01362 821048 or
                enquiries@falconcranes.co.uk
              </Text>
            </>
          </>
        </View>
      </ScrollView>
    );
  }
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
});

export default SprayBooth;
