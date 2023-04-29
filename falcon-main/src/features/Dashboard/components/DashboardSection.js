import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DashboardButton from './DashboardButton';
import {colours, font} from '../../../config';

const DashboardSection = props => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.section}>{props.title}</Text>
      </View>
      <View style={styles.flex}>
        {props.buttons.map((item, key) => (
          <DashboardButton
            title={item.title}
            icon={item.icon}
            colour={item.colour}
            goto={item.goto}
            width={item.width}
            key={key}
            // fontSize={item.title == 'Risk Assessments' ? 5 : 10}
            style={{fontSize: 5}}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fdc73e',
    marginTop: 6,
  },
  section: {
    color: colours.buttonTitle,
    fontSize: 16,
    padding: 6,
    marginLeft: 6,
    fontWeight: '700',
    fontFamily: font.fontFamily,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 1,
  },
});

export default DashboardSection;
