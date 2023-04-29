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

const Documents = ({route}) => {
  const navigation = useNavigation();

  const [about, setAbout] = useState(true);
  const [accreditation, setAccreditation] = useState(false);
  const [terms, setTerms] = useState(false);

  const {status, data} = usePostRequest('/api/accreditations', {});

  const [scrollEnabled, setScrollEnabled] = useState(true);

  if (status == 'fetching') {
    return <Loading />;
  }

  if (status == 'fetched') {
    return (
      <ScrollView style={{flex: 1, padding: 5}} scrollEnabled={scrollEnabled}>
        <View style={styles.mainContainer}>
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 5,
                justifyContent: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  width: 110,
                  backgroundColor: about ? '#fdc73e' : '#e5e5e5',
                  margin: 10,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAbout(true);
                    setAccreditation(false);
                    setTerms(false);
                  }}>
                  <Text
                    style={{textAlign: 'center', fontFamily: font.fontFamily, color: 'black'}}>
                    ABOUT
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 110,
                  backgroundColor: accreditation ? '#fdc73e' : '#e5e5e5',
                  margin: 10,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAbout(false);
                    setAccreditation(true);
                    setTerms(false);
                  }}>
                  <Text
                    style={{textAlign: 'center', fontFamily: font.fontFamily, color: 'black'}}>
                    ACCREDITATION
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 110,
                  backgroundColor: terms ? '#fdc73e' : '#e5e5e5',
                  margin: 10,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAbout(false);
                    setAccreditation(false);
                    setTerms(true);
                  }}>
                  <Text
                    style={{textAlign: 'center', fontFamily: font.fontFamily, color: 'black'}}>
                    TERMS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {about ? (
              <>
                <Text
                  style={{
                    fontWeight: '400',
                    ...styles.label,
                    fontSize: 17,
                  }}>
                  Health and Safety Accreditation
                </Text>
                <Text style={styles.label}>
                  Falcon takes the health, safety, welfare and the environment
                  very seriously and nothing is more important to this company
                  than the wellbeing of its employees and customers.
                </Text>

                <Text style={styles.label}>
                  One of the many steps that Falcon takes to ensure a safe place
                  of work is undertaking the accreditation of seven different
                  SSIPs (Safe Systems in Procurement). Being a member of a SSIP
                  demonstrates to our customers that we have attained the
                  appropriate core criteria which has been endorsed by the
                  Health and Safety Executive (HSE). Falcon are active members
                  of the Supply Chain Sustainability School which shows
                  commitment to a more sustainably built environment.
                </Text>

                <Text
                  style={{
                    fontWeight: '400',
                    ...styles.label,
                    fontSize: 17,
                  }}>
                  ISO9001
                </Text>

                <Text style={styles.label}>
                  In addition to the SSIPs Falcon also holds ISO9001:2015
                  quality accreditation, which has been held since 2007 and
                  updated to the latest standard in the final quarter of 2018.
                  This Management System is germane to our company ethos and
                  demonstrates to our customers the important emphasis placed on
                  quality assurance. Accreditation to a recognised quality
                  standard is essential for dealing with and complying with
                  legislation. Holding this accreditation ensures we identify,
                  measure and improve our core processes. Continual improvement
                  is vital in assuring that we comply to the standard, ISO9001
                  is the world’s most widely recognised quality management
                  standard.
                </Text>

                <Text
                  style={{
                    fontWeight: '400',
                    ...styles.label,
                    fontSize: 17,
                  }}>
                  ISO14001
                </Text>

                <Text style={styles.label}>
                  Falcon holds an environmental management system (EMS) standard
                  ISO14001:2015. This accreditation was gained in 2014 and
                  updated in line with our ISO9001. Holding this accreditation
                  assists the organisation to focus, identify and manage
                  environmental conditions, such as the reduction of carbon
                  footprints, making the most out of renewable energy and
                  cutting waste. It ensures that Falcon stays compliant with
                  current environmental legislation while publicly demonstrating
                  commitment to protecting the environment with our continual
                  improvement.
                </Text>

                <Text
                  style={{
                    fontWeight: '400',
                    ...styles.label,
                    fontSize: 17,
                  }}>
                  OHSAS18001
                </Text>

                <Text style={styles.label}>
                  Occupational Health and Safety Assessment Series, (officially
                  BS OHSAS 18001) is an internationally applied British Standard
                  for occupational health and safety management systems. Falcon
                  will be upgrading this accreditation in the second quarter of
                  2019 to the latest version which will become ISO45001:2018.
                  Like the other accreditations it provides a framework to
                  identify, control and decrease the risk associated with health
                  and safety within the work place. Our aim is to reduce the
                  likelihood of accidents and incidents and demonstrate a sound
                  occupational health and safety performance. The accreditation
                  lets our customers know that, in Falcon, we are serious about
                  safety within the organisation, thus making our organisation a
                  safer place in which to work.
                </Text>

                <Text
                  style={{
                    fontWeight: '400',
                    ...styles.label,
                    fontSize: 17,
                  }}>
                  FORS
                </Text>

                <Text style={styles.label}>
                  Falcon has recently incorporated a transport division into the
                  company and quickly achieved FORS Gold and CLOCS
                  accreditation. Being associated with FORS is a mark of quality
                  for our products and services. Gaining quality assurance has
                  given us the understanding of current legislation on the
                  latest rules of the road, our drivers can help to increase
                  traffic flow, reduce delays and cut running costs for our
                  business. This award shows our customers that we are committed
                  to improving safety by making our drivers aware of health and
                  safety for other drivers and vulnerable road users, in
                  addition to caring about the efficiency of our vehicles and
                  their environmental impacts.
                </Text>

                <Text style={styles.label}>
                  Falcon are also members of the Construction Plant Hire
                  Association (CPA), Tower Crane Interest Group (TCIG),
                  Achilles, Construction Line, SMAS, CHAS, Builders Profile and
                  Considerate Contractors.
                </Text>
              </>
            ) : null}

            {accreditation
              ? data.results.map((acc, key) => (
                  <>
                    <View style={{width: '100%', marginBottom: 10}}>
                      <Image
                        source={{
                          uri: `${acc}`,
                        }}
                        style={{
                          height: 160,
                          width: '100%',
                          margin: 1,
                          marginLeft: '1%',
                        }}
                      />
                    </View>
                  </>
                ))
              : null}
          </>

          {terms
            ? navigation.navigate('PDFviewer', {
                uri: 'https://app.falconcranes.co.uk/terms.pdf',
              })
            : null}
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

export default Documents;
